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
      {messages?.map((message) => {
        const isOwner = message.created_by.id === loggedUser.id;

        return (
          <div
            key={message.id}
            className={`flex flex-col p-3 ${
              isOwner ? "items-end" : "items-start"
            }`}
          >
            <div className="flex gap-2">
              {!isOwner && (
                <Link to={`/profile/${message.created_by.username}`}>
                  <img
                    alt={`${message.created_by.username}'s avatar`}
                    src={message.created_by.get_avatar}
                    className="w-10 h-10 rounded-full"
                  />
                </Link>
              )}

              <div
                className={`text-end flex flex-col ${
                  isOwner ? "items-end" : "items-start"
                }`}
              >
                <p
                  className={`px-3 py-2 w-fit rounded-2xl ${
                    isOwner ? "bg-sky-500 text-white" : "bg-gray-300"
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
        );
      })}
    </div>
  );
}
