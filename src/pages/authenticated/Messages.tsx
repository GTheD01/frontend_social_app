import { Outlet } from "react-router-dom";
import logo from "../../assets/result.png";
import { ConversationDetailsProps } from "../../components/pagecomponents/ConversationDetails";

import ConversationsList from "../../components/pagecomponents/ConversationsList";

const Messages = () => {
  const convers: ConversationDetailsProps[] = [
    {
      image: logo,
      name: "Jack Daniels",
      partialMessage: "The message he sent here can be longer",
      timeSent: "13:30",
      conversationId: "abc123",
    },
    {
      image: logo,
      name: "Jack Daniels",
      partialMessage: "The message he sent another",
      timeSent: "13:30",
      conversationId: "abc12",
    },
    {
      image: logo,
      name: "Jack Daniels",
      partialMessage: "The message he sent",
      timeSent: "13:30",
      conversationId: "abc1",
    },
  ];
  return (
    <div className="flex w-full justify-start h-full">
      <ConversationsList conversations={convers} />

      <Outlet />
    </div>
  );
};

export default Messages;
