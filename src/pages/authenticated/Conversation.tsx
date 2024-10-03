import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Form, useParams } from "react-router-dom";

import { useConversationDetailsQuery } from "../../redux/features/conversationApiSlice";
import { useAppSelector } from "../../redux/hooks";
import useWebSocket from "react-use-websocket";
import { MessageProps, UserProps } from "../../types/types";
import ConversationMessages from "../../components/pagecomponents/ConversationMessages";

const Conversation = () => {
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [realtimeMessages, setRealtimeMessages] = useState<MessageProps[]>([]);

  const { data: conversation } = useConversationDetailsQuery({
    conversationId,
  });

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

  const sendMessageHandler = async () => {
    sendJsonMessage({
      event: "chat_message",
      data: {
        body: message,
        name: loggedUser.username,
        sent_to_id: otherUser?.id,
        conversation_id: conversationId,
      },
    });

    setMessage("");
  };

  const onEnterClickHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget.form as HTMLFormElement).dispatchEvent(
        new Event("submit", { bubbles: true })
      );
    }
  };

  // TODO:  MESSAGES COUNT IMPLEMENT
  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage &&
      "message_id" in lastJsonMessage &&
      "created_at" in lastJsonMessage &&
      "created_by_id" in lastJsonMessage
    ) {
      const isOwner = lastJsonMessage?.created_by_id === loggedUser.id;
      const message: MessageProps = {
        id: lastJsonMessage.message_id as string,
        body: lastJsonMessage.body as string,
        sent_to: otherUser as UserProps,
        created_by: isOwner ? loggedUser : (otherUser as UserProps),
        created_at_formatted: lastJsonMessage.created_at as string,
      };
      setRealtimeMessages((realtimeMessages) => [...realtimeMessages, message]);
    }

    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }
    }, 50);
  }, [lastJsonMessage, loggedUser, otherUser]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [conversation?.messages]);

  return (
    <section className="w-[calc(100%-350px)] flex flex-col">
      <div className="overflow-y-auto h-full">
        <div className=" flex flex-col justify-end overflow-y min-h-full">
          <ConversationMessages
            messages={[...(conversation?.messages || []), ...realtimeMessages]}
            loggedUser={loggedUser}
          />

          {/* <ConversationMessages
            messages={realtimeMessages}
            loggedUser={loggedUser}
          /> */}

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
