import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { ErrorObject } from "../types/zodTypes";
import { useCreatePostMutation } from "../redux/features/postsApiSlice";
import { addPost, setSharePostModal } from "../redux/features/postSlice";

const useSharePostCreate = (sharedPostId: string | undefined) => {
  const dispatch = useDispatch();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [body, setBody] = useState("");
  const [selectedShareFile, setSelectedShareFile] = useState<FileList | null>(
    null
  );

  const sharedFileInputRef = useRef<HTMLInputElement | null>(null);

  const [sharedFileUrl, setSharedFileUrl] = useState<string[]>([]);
  const [error, setError] = useState<ErrorObject>();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const clearAttachment = (idx: number) => {
    if (selectedShareFile) {
      const dt = new DataTransfer();
      Array.from(selectedShareFile).forEach((file, i) => {
        if (i !== idx) {
          dt.items.add(file);
        }
      });

      setSelectedShareFile(dt.files);
    }
    if (sharedFileInputRef.current && selectedShareFile?.length === 1) {
      setSelectedShareFile(null);
      sharedFileInputRef.current.value = "";
    }
  };

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.target.files) {
      setSelectedShareFile(e.target.files);
    }
  };

  useEffect(() => {
    if (selectedShareFile) {
      setSharedFileUrl([]);
      for (let i = 0; i < selectedShareFile.length; i++) {
        const url = URL.createObjectURL(selectedShareFile![i]);
        setSharedFileUrl((prev) => [...prev, url]);
      }
    }
  }, [selectedShareFile]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("body", body);
    if (sharedPostId) {
      formData.append("shared", sharedPostId);
    }
    if (selectedShareFile) {
      for (let i = 0; i < selectedShareFile.length; i++) {
        formData.append("image", selectedShareFile[i]);
      }
    }

    createPost(formData)
      .unwrap()
      .then((response) => {
        dispatch(addPost(response));
        if (sharedFileInputRef.current) {
          setSelectedShareFile(null);
          sharedFileInputRef.current.value = "";
        }
        toast.success("Post created");
        dispatch(setSharePostModal({ state: false }));
        setBody("");
        setError({});
      })
      .catch((err) => {
        console.log(err);
        setError({ error: err.data.error });
      });
  };

  return {
    body,
    setBody,
    onChange,
    onSubmit,
    isLoading,
    error,
    imageUploadHandler,
    selectedShareFile,
    sharedFileInputRef,
    sharedFileUrl,
    clearAttachment,
  };
};

export default useSharePostCreate;
