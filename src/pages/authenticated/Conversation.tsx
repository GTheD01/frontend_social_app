import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Form, useParams } from "react-router-dom";

import { useConversationDetailsQuery } from "../../redux/features/conversationApiSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useWebSocket from "react-use-websocket";
import { MessageProps, UserProps } from "../../types/types";
import ConversationMessages from "../../components/pagecomponents/ConversationMessages";
import {
  addMessage,
  setLastMessage,
  setMessages,
} from "../../redux/features/conversationSlice";

const Conversation = () => {
  const dispatch = useAppDispatch();
  const { conversationId } = useParams();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSending, setIsSending] = useState(false);
  const messages = useAppSelector((store) => store.conversation.messages);

  const { data: conversation } = useConversationDetailsQuery(
    {
      conversationId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const loggedUser = useAppSelector((state) => state.user);
  const otherUser = conversation?.users.find(
    (user) => user.id !== loggedUser.id
  );

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    `ws://127.0.0.1:8000/ws/chat/${conversationId}/`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  const sendMessageHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending || message.trim() === "") return;
    setIsSending(true);

    sendJsonMessage({
      event: "chat_message",
      data: {
        body: message,
        name: loggedUser.username,
        sent_to: otherUser,
        conversation_id: conversationId,
      },
    });

    setMessage("");
    setIsSending(false);
  };

  const onEnterClickHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageHandler(e);
    }
  };

  useEffect(() => {
    dispatch(
      setMessages({
        conversationId: conversationId,
        messages: conversation?.messages,
      })
    );
  }, [conversation]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage &&
      "message_id" in lastJsonMessage &&
      "created_at" in lastJsonMessage &&
      "created_by_id" in lastJsonMessage &&
      "conversation_id" in lastJsonMessage
    ) {
      const isOwner = lastJsonMessage?.created_by_id === loggedUser.id;

      const msg: MessageProps = {
        id: lastJsonMessage.message_id as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserProps,
        created_by: isOwner ? loggedUser : (otherUser as UserProps),
        created_at_formatted: lastJsonMessage.created_at as string,
      };

      if (lastJsonMessage.conversation_id === conversationId) {
        dispatch(addMessage({ conversationId: conversationId, message: msg }));
        dispatch(
          setLastMessage({
            conversationId: conversationId,
            message: `${isOwner ? "You" : otherUser?.username}: ${
              lastJsonMessage.body
            }`,
            seen: true,
          })
        );
      }
    }

    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }
    }, 50);
  }, [lastJsonMessage]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [conversation?.messages, messages[conversationId!]]);

  return (
    <section className="w-[calc(100%-350px)] flex flex-col">
      <div className="overflow-y-auto h-full">
        <div className=" flex flex-col justify-end overflow-y min-h-full">
          <ConversationMessages
            messages={messages[conversationId!]}
            loggedUser={loggedUser}
          />
          <div ref={messagesEndRef} />
        </div>
      </div>

      <Form onSubmit={sendMessageHandler} className="relative">
        <label htmlFor="sentMessage" className="w-full relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Aa"
            autoFocus
            id="sentMessage"
            className="w-full min-h-10 max-h-60 resize-none overflow-y-auto p-2 rounded-2xl outline-none h-auto pr-16"
            onKeyDown={onEnterClickHandler}
            required
          />
          <button
            disabled={message.length < 1}
            type="submit"
            className="absolute right-0 bottom-1/2 -translate-y-1/2 mr-3 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </label>
      </Form>
    </section>
  );
};

export default Conversation;
