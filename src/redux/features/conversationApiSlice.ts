import { Params } from "react-router-dom";

import { ConversationDetailsProps, ConversationProps } from "../../types/types";
import { apiSlice } from "../services/apiSlice";

export const conversationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrCreateMessage: builder.query({
      query: (userId) => `chat/get-or-create/${userId}`,
      providesTags: ["Messages", "User"],
    }),
    conversationDetails: builder.query<
      ConversationDetailsProps,
      Params<string>
    >({
      query: ({ conversationId }) => ({
        url: `chat/${conversationId}/`,
      }),
      providesTags: ["Messages"],
      async onQueryStarted({ conversationId }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.invalidateTags(["User"]));
        } catch (error) {
          console.error("Failed to invalidate user data:", error);
        }
      },
    }),
    retrieveConversations: builder.query<ConversationProps[], void>({
      query: () => "/chat/",
      providesTags: ["Messages", "User"],
    }),
  }),
});

export const {
  useConversationDetailsQuery,
  useRetrieveConversationsQuery,
  useLazyGetOrCreateMessageQuery,
} = conversationApiSlice;
