import { useEffect, useRef, useState } from "react";
import { Form } from "react-router-dom";

import Spinner from "../common/Spinner";

import EmojiPicker from "emoji-picker-react";

import { RxCross1 } from "react-icons/rx";
import { IoIosAttach } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { PostProps } from "../../types/types";
import Carousel from "../pagecomponents/Carousel";
import useSharePostCreate from "../../hooks/useSharePostCreate";

const SharedPostForm = ({ shared }: { shared?: PostProps | undefined }) => {
  const {
    body,
    setBody,
    isLoading,
    onChange,
    onSubmit,
    error,
    imageUploadHandler,
    selectedShareFile,
    sharedFileInputRef,
    sharedFileUrl,
    clearAttachment,
  } = useSharePostCreate(shared?.id);

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
    <Form onSubmit={onSubmit} className="p-4 w-full">
      <textarea
        onChange={onChange}
        name="body"
        value={body}
        placeholder="Write Something..."
        maxLength={1024}
        className="resize-none w-full bg-transparent outline-none h-44 pt-8"
      />
      {error?.error && <p className="text-red-500">{error.error}</p>}

      {selectedShareFile && selectedShareFile.length > 0 && (
        <div className="flex gap-2">
          {sharedFileUrl.map((url, idx) => (
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
      {shared && (
        <div className="border-l-2 ml-4 pl-4">
          <div className="flex items-center gap-3">
            <img
              alt="shared-post-user-photo"
              src={shared.created_by.get_avatar}
              className="w-8 h-8 rounded-full border-gray-300 border"
            />
            <span>{shared.created_by.username}</span>
            <span className="text-gray-400 text-xs">
              {shared.created_at_formatted}
            </span>
          </div>
          <div className="mt-4">{shared.body}</div>
          {shared.attachments && shared.attachments.length > 0 && (
            <div className="w-96">
              <Carousel attachments={shared.attachments} />
            </div>
          )}
        </div>
      )}
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <label htmlFor="sharedAttachment" className="cursor-pointer">
            <IoIosAttach size={24} />
            <input
              id="sharedAttachment"
              type="file"
              className="hidden"
              name="sharedAttachment"
              onChange={imageUploadHandler}
              multiple
              ref={sharedFileInputRef}
              accept="image/*"
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
          disabled={
            isLoading ||
            (!selectedShareFile && body.trimStart().length < 1 && !shared)
          }
          type="submit"
          className="px-8 py-2 rounded-md bg-sky-400 hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-sky-300"
        >
          {isLoading ? <Spinner md /> : "Post"}
        </button>
      </div>
    </Form>
  );
};

export default SharedPostForm;
