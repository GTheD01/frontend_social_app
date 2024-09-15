import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";

import usePostCreate from "../../hooks/usePostCreate";
import Spinner from "../common/Spinner";

import EmojiPicker from "emoji-picker-react";

import { RxCross1 } from "react-icons/rx";
import { IoIosAttach } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";

const PostForm = () => {
  const {
    body,
    setBody,
    isLoading,
    onChange,
    onSubmit,
    error,
    imageUploadHandler,
    selectedFile,
    fileInputRef,
    fileUrl,
    clearAttachment,
  } = usePostCreate();

  const [showEmoji, setShowEmoji] = useState(false);
  const emojiPanelRef = useRef<HTMLSpanElement | null>(null);
  const emojiTriggerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const closeEmojiPanelOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowEmoji(false);
      }
    };

    const closeEmojiPanelOnClickOutside = (e: MouseEvent) => {
      if (
        e.target !== emojiTriggerRef.current &&
        !emojiPanelRef.current?.childNodes[1]?.contains(e.target as Node)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("keydown", closeEmojiPanelOnEscape);
    document.addEventListener("click", closeEmojiPanelOnClickOutside);

    return () => {
      document.removeEventListener("keydown", closeEmojiPanelOnEscape);
      document.removeEventListener("click", closeEmojiPanelOnClickOutside);
    };
  }, [showEmoji]);

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
      {error?.error && <p className="text-red-500">{error.error}</p>}
      {selectedFile && (
        <div className="flex gap-2">
          {fileUrl.map((url, idx) => (
            <div className="relative w-32 h-32" key={url}>
              <img src={url} className="w-32 h-32 object-contain" alt="file" />
              <span
                onClick={() => clearAttachment(idx)}
                className="absolute top-0 right-0 cursor-pointer"
              >
                <RxCross1 />
              </span>
            </div>
          ))}
        </div>
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
              multiple
              ref={fileInputRef}
            />
          </label>
          <span className="cursor-pointer">
            <IoLocationOutline size={24} />
          </span>
          <span className="cursor-pointer relative">
            <span
              ref={emojiTriggerRef}
              onClick={() => setShowEmoji((state) => !state)}
            >
              <MdOutlineEmojiEmotions
                className="pointer-events-none"
                size={24}
              />
            </span>
            <span ref={emojiPanelRef} className="absolute">
              <EmojiPicker
                open={showEmoji}
                onEmojiClick={(e) => {
                  setBody((prevState) => prevState + e.emoji);
                }}
              />
            </span>
          </span>
        </div>
        <button
          disabled={isLoading || (!selectedFile && body.trimStart().length < 1)}
          type="submit"
          className="px-8 py-2 rounded-md bg-sky-400 hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-sky-300"
        >
          {isLoading ? <Spinner md /> : "Post"}
        </button>
      </div>
    </Form>
  );
};

export default PostForm;
