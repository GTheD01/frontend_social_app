import { Outlet } from "react-router-dom";

import ConversationsList from "../../components/pagecomponents/ConversationsList";

const Messages = () => {
  return (
    <div className="flex w-full justify-start h-full">
      <ConversationsList />

      <Outlet />
    </div>
  );
};

export default Messages;
