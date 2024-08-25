import { NavLink } from "react-router-dom";
import { LastReceivedMessageProps } from "../../types/types";

import { GoDotFill } from "react-icons/go";

export interface ConversationDetailsProps {
  image: string;
  name: string;
  timeSent: string;
  conversationId: string;
  lastMessageReceived: LastReceivedMessageProps;
  onClick: () => void;
}

const ConversationDetails = ({
  image,
  name,
  timeSent,
  conversationId,
  lastMessageReceived,
  onClick,
}: ConversationDetailsProps) => {
  return (
    <NavLink
      onClick={onClick}
      to={conversationId}
      className={({ isActive }) =>
        `flex items-center hover:bg-gray-200 cursor-pointer p-4 ${
          isActive ? "bg-gray-300" : ""
        }`
      }
    >
      <img alt="user avatar" src={image} className="w-16 h-16 rounded-full" />
      <div className="ml-2">
        <p
          className={` ${
            lastMessageReceived.seen ? "font-semibold" : "font-extrabold"
          }`}
        >
          {name}
        </p>
        <p className={`${lastMessageReceived.seen ? "" : "font-semibold"}`}>
          {lastMessageReceived.last_message}
        </p>
      </div>
      <span
        className={`ml-auto ${
          lastMessageReceived.seen ? "" : "font-bold flex items-center gap-2"
        }`}
      >
        {timeSent}
        {!lastMessageReceived.seen && (
          <span>
            <GoDotFill className="fill-sky-500" />
          </span>
        )}
      </span>
    </NavLink>
  );
};

export default ConversationDetails;
