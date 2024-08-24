import { Link } from "react-router-dom";

export interface ConversationDetailsProps {
  image: string;
  name: string;
  partialMessage: string;
  timeSent: string;
  conversationId: string;
}

const ConversationDetails = ({
  image,
  name,
  partialMessage,
  timeSent,
  conversationId,
}: ConversationDetailsProps) => {
  return (
    <Link
      to={conversationId}
      className="flex items-center hover:bg-gray-300 cursor-pointer p-4"
    >
      <img alt="user avatar" src={image} className="w-16 h-16 rounded-full" />
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-gray-500">{`${partialMessage.slice(0, 19)}...`}</p>
      </div>
      <span className="ml-8">{timeSent}</span>
    </Link>
  );
};

export default ConversationDetails;
