import { Form } from "react-router-dom";

const PostForm = () => {
  return (
    <Form className="bg-gray-300 p-4 w-full">
      <textarea
        placeholder="Write Something..."
        maxLength={1024}
        className="resize-none w-full bg-transparent outline-none h-44 pt-8"
      />
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <span>Attach</span>
          <span>Location</span>
          <span>Emojis</span>
        </div>
        <button
          type="submit"
          className="px-8 py-2 rounded-md bg-sky-500/70 hover:bg-sky-400"
        >
          Post
        </button>
      </div>
    </Form>
  );
};

export default PostForm;
