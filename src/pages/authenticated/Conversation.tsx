import { useParams } from "react-router-dom";

const Conversation = () => {
  // Fetch the conversation details with the conversation id
  const { conversationId } = useParams();

  return (
    <section className="w-[calc(100%-350px)] flex flex-col">
      <div className="flex flex-col flex-grow overflow-y-auto border-r-2">
        <div className="flex flex-col items-end justify-end min-h-full scroll-smooth">
          <p className="p-4 font-bold">Conversation ID: {conversationId}</p>
        </div>
      </div>
      <label htmlFor="sentMessage" className="w-full">
        <textarea
          placeholder="Aa"
          autoFocus
          id="sentMessage"
          className="w-full min-h-10 max-h-60 resize-none overflow-y-auto p-2 rounded-2xl outline-none h-auto"
        />
      </label>
    </section>
  );
};

export default Conversation;
