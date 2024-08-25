import { Link } from "react-router-dom";

export interface ConversationDetailsProps {
  image: string;
  name: string;
  timeSent: string;
  conversationId: string;
}

const ConversationDetails = ({
  image,
  name,
  timeSent,
  conversationId,
}: ConversationDetailsProps) => {
  return (
    <Link
      to={conversationId}
      className="flex items-center hover:bg-gray-300 cursor-pointer p-4"
    >
      <img alt="user avatar" src={image} className="w-16 h-16 rounded-full" />
      <div className="ml-2">
        <p className="font-semibold">{name}</p>
      </div>
      <span className="ml-auto">{timeSent}</span>
    </Link>
  );
};

export default ConversationDetails;
