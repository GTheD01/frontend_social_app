import { createSlice } from "@reduxjs/toolkit";
import { ConversationProps, MessageProps } from "../../types/types";

const initialState: {
  conversations: ConversationProps[];
  messages: Record<string, MessageProps[]>;
} = {
  conversations: [],
  messages: {},
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setMessages: (state, { payload }) => {
      const { conversationId, messages } = payload;
      state.messages[conversationId] = messages;
    },
    addMessage: (state, { payload }) => {
      const { conversationId, message } = payload;
      state.messages[conversationId].push(message);
    },
    setConversations: (state, { payload }) => {
      state.conversations = payload.conversations;
    },
    setLastMessage: (state, { payload }) => {
      const { conversationId, message, seen } = payload;
      const index = state.conversations.findIndex(
        (conv) => conv.id === conversationId
      );
      if (index !== -1) {
        state.conversations[index].last_received_message = {
          last_message: message,
          seen: seen,
        };
      }
    },
  },
});

export const { setConversations, setLastMessage, setMessages, addMessage } =
  conversationSlice.actions;
export default conversationSlice.reducer;
