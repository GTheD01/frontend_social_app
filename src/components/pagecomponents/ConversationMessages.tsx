import { Link } from "react-router-dom";
import { MessageProps, UserProps } from "../../types/types";

export default function ConversationMessages({
  messages,
  loggedUser,
}: {
  messages?: MessageProps[];
  loggedUser: UserProps;
}) {
  return (
    <div>
      {messages?.map((message) => (
        <div
          key={message.id}
          className={`flex flex-col p-3 ${
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
            <div
              className={`text-end flex flex-col ${
                message.created_by.id === loggedUser.id && "items-end"
              }`}
            >
              <p
                className={`px-3 py-2 w-fit rounded-2xl ${
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
  );
}
