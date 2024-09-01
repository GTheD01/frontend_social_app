import { PostProps, RetrievePostsResponse } from "../../types/types";
import { apiSlice } from "../services/apiSlice";
import { addPost } from "./postSlice";

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    retrievePosts: builder.query<RetrievePostsResponse, string | null>({
      query: (cursor) => {
        return cursor ? `/posts/?cursor=${cursor}` : "/posts/";
      },
    }),
    createPost: builder.mutation({
      query: (formData) => ({
        url: "/posts/create/",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;

          dispatch(addPost(updatedPost));

          dispatch(
            postsApiSlice.util.updateQueryData(
              "retrievePosts",
              null,
              (draft) => {
                draft.results.unshift(updatedPost);
              }
            )
          );
        } catch {}
      },
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `posts/like/${id}/`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;

          dispatch(
            postsApiSlice.util.updateQueryData(
              "retrievePosts",
              null,
              (draft) => {
                const postIndex = draft.results.findIndex(
                  (post) => post.id === id
                );

                if (postIndex !== -1) {
                  draft.results[postIndex] = updatedPost;
                }
              }
            )
          );
        } catch {}
      },
      invalidatesTags: ["User", "Post"],
    }),
    savePost: builder.mutation({
      query: (id) => ({
        url: `posts/save/${id}/`,
        method: "POST",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data: updatedPost } = await queryFulfilled;

          dispatch(
            postsApiSlice.util.updateQueryData(
              "retrievePosts",
              null,
              (draft) => {
                const postIndex = draft.results.findIndex(
                  (post) => post.id === id
                );

                if (postIndex !== -1) {
                  draft.results[postIndex] = updatedPost;
                }
              }
            )
          );
        } catch {}
      },
      invalidatesTags: ["Post"],
    }),
    retrieveProfilePosts: builder.query<PostProps[], string | undefined>({
      query: (username) => `/posts/profile/${username}`,
      providesTags: ["Post"],
    }),
    retrievePostDetails: builder.query({
      query: (id) => `posts/${id}/`,
      providesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/delete/${id}/`,
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch }) {
        try {
          dispatch(
            postsApiSlice.util.updateQueryData(
              "retrievePosts",
              null,
              (draft) => {
                const postIndex = draft.results.findIndex(
                  (post) => post.id === id
                );

                if (postIndex > -1) {
                  draft.results.splice(postIndex, 1);
                }
              }
            )
          );
        } catch {}
      },
      invalidatesTags: ["Post"],
    }),

    commentPost: builder.mutation({
      query: ({ postId, body }) => ({
        url: `posts/comment/${postId}/`,
        method: "POST",
        body: { body: body },
      }),
      invalidatesTags: ["Post"],
    }),
    removeComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `posts/${postId}/comment/delete/${commentId}/`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),

    retrieveSavedPosts: builder.query<PostProps[], string | undefined>({
      query: (username) => `posts/saved/${username}`,
      providesTags: ["Post"],
    }),
  }),
});

export const {
  useRetrieveProfilePostsQuery,
  useRetrievePostDetailsQuery,

  useLazyRetrievePostsQuery,

  useDeletePostMutation,
  useRemoveCommentMutation,
  useCommentPostMutation,
  useRetrieveSavedPostsQuery,
  useLikePostMutation,
  useSavePostMutation,
  useCreatePostMutation,
} = postsApiSlice;
