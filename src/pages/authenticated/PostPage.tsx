import { FormEvent, useEffect, useRef, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { toast } from "react-toastify";

import {
  useCommentPostMutation,
  useRetrievePostDetailsQuery,
} from "../../redux/features/postsApiSlice";
import Post from "../../components/pagecomponents/Post";
import Spinner from "../../components/common/Spinner";
import { addPostComment } from "../../redux/features/postSlice";

const PostPage = () => {
  const { postId } = useParams();
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const [commentBody, setCommentBody] = useState("");
  const [commentError, setCommentError] = useState("");
  const dispatch = useDispatch();

  const { data, isLoading } = useRetrievePostDetailsQuery(postId);

  useEffect(() => {
    if (!isLoading) {
      textRef.current?.focus();
    }
  }, [isLoading]);

  const [commentPost] = useCommentPostMutation();

  const commentPostHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addPostComment(postId as string));
    commentPost({ postId: postId, body: commentBody })
      .unwrap()
      .then((res) => {
        toast.success("Comment posted");
      })
      .catch((error) => {
        setCommentError(error.data.error);
      })
      .finally(() => setCommentBody(""));
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-[596px]">
        {isLoading ? (
          <Spinner lg />
        ) : (
          <div>
            <Post
              comments_count={data?.comments_count}
              comments={data?.comments}
              post_owner={data?.post_owner}
              post_saved={data?.post_saved}
              attachments={data?.attachments}
              user_liked={data?.user_liked}
              likes_count={data?.likes_count}
              image={data?.created_by.get_avatar}
              username={data?.created_by.username}
              body={data?.body}
              created_at={data?.created_at_formatted}
              postId={data?.id}
            />

            <Form className="mt-8" onSubmit={(e) => commentPostHandler(e)}>
              <div className="relative w-full">
                <textarea
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  ref={textRef}
                  placeholder="Comment..."
                  className="resize-none w-full p-2 pr-24 outline-none bg-transparent shadow-md"
                ></textarea>
                <button
                  type="submit"
                  className="absolute top-1/2 -translate-y-1/2 right-0 w-24 text-gray-800"
                >
                  Comment
                </button>
              </div>
              <span className="text-red-500">{commentError}</span>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
