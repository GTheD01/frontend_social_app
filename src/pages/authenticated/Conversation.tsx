import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Form, Link, useParams } from "react-router-dom";
import {
  useConversationDetailsQuery,
  useSendMessageMutation,
} from "../../redux/features/authApiSlice";
import { useAppSelector } from "../../redux/hooks";

const Conversation = () => {
  const [message, setMessage] = useState("");
  const { conversationId } = useParams();
  const loggedUser = useAppSelector((state) => state.user);

  const [sendMessage] = useSendMessageMutation();
  const { data } = useConversationDetailsQuery({ conversationId });

  const sendMessageHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    sendMessage({ conversationId: conversationId, message: message })
      .unwrap()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setMessage("");
      });
  };

  const onEnterClickHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget.form as HTMLFormElement).dispatchEvent(
        new Event("submit", { bubbles: true })
      );
    }
  };

  return (
    <section className="w-[calc(100%-350px)] flex flex-col">
      <div className="flex flex-col justify-end flex-grow overflow-y-auto border-r-2 scroll-smooth">
        {data?.messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col p-2 ${
              message.created_by.id === loggedUser.id
                ? "items-end"
                : "items-start"
            }`}
          >
            <div className="flex gap-2">
              {message.created_by.id !== loggedUser.id && (
                <Link to={`/profile/${message.created_by.username}`}>
                  <img
                    alt="other user avatar"
                    src={message.created_by.get_avatar}
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              )}
              <div>
                <p
                  className={`px-4 py-2 rounded-2xl ${
                    message.created_by.id === loggedUser.id
                      ? "bg-sky-500 text-white"
                      : "bg-gray-300"
                  }`}
                >
                  {message.body}
                </p>
                <span className="text-gray-500 text-xs tracking-tighter">
                  {message.created_at_formatted} ago
                </span>
              </div>
            </div>
          </div>
        ))}
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
          />
          <button
            type="submit"
            className="absolute right-0 bottom-1/2 -translate-y-1/2 mr-3"
          >
            Send
          </button>
        </label>
      </Form>
    </section>
  );
};

export default Conversation;
