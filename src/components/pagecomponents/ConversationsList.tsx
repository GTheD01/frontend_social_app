import ConversationDetails, {
  ConversationDetailsProps,
} from "./ConversationDetails";

interface ConversationsListProps {
  conversations: ConversationDetailsProps[];
}

const ConversationsList = ({ conversations }: ConversationsListProps) => {
  return (
    <section className="border-r-gray-300 border-r overflow-y-auto w-[350px]">
      <p className="mb-4 font-bold tracking-wide text-xl">Conversations</p>
      {conversations.map((conversation) => (
        <ConversationDetails
          key={conversation.conversationId}
          conversationId={conversation.conversationId}
          image={conversation.image}
          name={conversation.name}
          partialMessage={conversation.partialMessage}
          timeSent={conversation.timeSent}
        />
      ))}
    </section>
  );
};

export default ConversationsList;
