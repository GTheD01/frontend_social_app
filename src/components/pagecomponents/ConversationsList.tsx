import { useRetrieveConversationsQuery } from "../../redux/features/authApiSlice";
import ConversationDetails from "./ConversationDetails";

const ConversationsList = () => {
  const { data, refetch } = useRetrieveConversationsQuery();

  const refetchHandler = () => {
    refetch();
  };

  return (
    <section className="border-r-gray-300 border-r overflow-y-auto w-[350px]">
      <p className="mb-4 font-bold tracking-wide text-xl">Conversations</p>
      {data?.map((conversation) => (
        <ConversationDetails
          onClick={refetchHandler}
          lastMessageReceived={conversation.last_received_message}
          key={conversation.id}
          conversationId={conversation.id}
          image={conversation.user?.get_avatar as string}
          name={conversation.user?.username}
          timeSent={conversation.modified_at_formatted}
        />
      ))}
    </section>
  );
};

export default ConversationsList;