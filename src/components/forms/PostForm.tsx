import { Form } from "react-router-dom";
import usePostCreate from "../../hooks/usePostCreate";
import Spinner from "../common/Spinner";

import { IoIosAttach } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const PostForm = () => {
  const {
    body,
    isLoading,
    onChange,
    onSubmit,
    error,
    imageUploadHandler,
    selectedFile,
    fileInputRef,
    fileUrl,
  } = usePostCreate();

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
      <p className="text-red-500">{error?.body}</p>
      {selectedFile && (
        <img src={fileUrl} className="w-48 h-48 object-contain" />
      )}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="attachment" className="cursor-pointer">
            <IoIosAttach size={24} />
            <input
              id="attachment"
              type="file"
              className="hidden"
              name="attachment"
              onChange={imageUploadHandler}
              ref={fileInputRef}
            />
          </label>
          <span className="cursor-pointer">
            <IoLocationOutline size={24} />
          </span>
          <span className="cursor-pointer">
            <MdOutlineEmojiEmotions size={24} />
          </span>
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
