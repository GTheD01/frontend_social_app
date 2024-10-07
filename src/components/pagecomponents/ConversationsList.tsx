import { useEffect } from "react";

import { useRetrieveConversationsQuery } from "../../redux/features/conversationApiSlice";
import ConversationDetails from "./ConversationListDetails";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setConversations } from "../../redux/features/conversationSlice";
import {
  setMessagesCount,
  updateMessagesCount,
} from "../../redux/features/userSlice";

const ConversationsList = () => {
  const { data: conversations } = useRetrieveConversationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const dispatch = useAppDispatch();
  const convs = useAppSelector((store) => store.conversation.conversations);

  useEffect(() => {
    dispatch(setConversations({ conversations: conversations }));
  }, [conversations]);

  const refetchHandler = (id: string) => {
    const conversation = convs.find((conversation) => conversation.id === id);
    if (conversation?.last_received_message.seen === false) {
      dispatch(updateMessagesCount({ count: -1 }));
    }
  };

  return (
    <section className="border-r-gray-300 border-r overflow-y-auto w-[350px]">
      <p className="mb-4 font-bold tracking-wide text-xl">Conversations</p>
      {convs?.map((conversation) => (
        <ConversationDetails
          onClick={() => refetchHandler(conversation.id)}
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
