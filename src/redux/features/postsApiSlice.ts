import { PostProps, RetrievePostsResponse } from "../../types/types";
import { apiSlice } from "../services/apiSlice";

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
      invalidatesTags: ["Post"],
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `posts/like/${id}/`,
        method: "POST",
      }),
      invalidatesTags: ["Post"],
    }),
    savePost: builder.mutation({
      query: (id) => ({
        url: `posts/save/${id}/`,
        method: "POST",
      }),
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
