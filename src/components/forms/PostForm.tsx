import { Form } from "react-router-dom";
import usePostCreate from "../../hooks/usePostCreate";
import Spinner from "../common/Spinner";

const PostForm = () => {
  const { body, isLoading, onChange, onSubmit } = usePostCreate();

  return (
    <Form onSubmit={onSubmit} className="shadow-2xl p-4 w-full">
      <textarea
        onChange={onChange}
        name="body"
        value={body}
        placeholder="Write Something..."
        maxLength={1024}
        className="resize-none w-full bg-transparent outline-none h-44 pt-8"
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span className="cursor-pointer">Attach</span>
          <span className="cursor-pointer">Location</span>
          <span className="cursor-pointer">Emojis</span>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="px-8 py-2 rounded-md bg-sky-500/70 hover:bg-sky-400"
        >
          {isLoading ? <Spinner md /> : "Post"}
        </button>
      </div>
    </Form>
  );
};

export default PostForm;
