import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import { ErrorObject } from "../types/zodTypes";
import { useCreatePostMutation } from "../redux/features/postsApiSlice";
import { addPost } from "../redux/features/postSlice";

const usePostCreate = () => {
  const dispatch = useDispatch();
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState<FileList | null>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [fileUrl, setFileUrl] = useState<string[]>([]);
  const [error, setError] = useState<ErrorObject>();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const clearAttachment = (idx: number) => {
    if (selectedFile) {
      const dt = new DataTransfer();
      Array.from(selectedFile).forEach((file, i) => {
        if (i !== idx) {
          dt.items.add(file);
        }
      });

      setSelectedFile(dt.files);
    }
    if (fileInputRef.current && selectedFile?.length === 1) {
      setSelectedFile(null);
      fileInputRef.current.value = "";
    }
  };

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      setFileUrl([]);
      for (let i = 0; i < selectedFile.length; i++) {
        const url = URL.createObjectURL(selectedFile![i]);
        setFileUrl((prev) => [...prev, url]);
      }
    }
  }, [selectedFile]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("body", body);
    if (selectedFile) {
      for (let i = 0; i < selectedFile.length; i++) {
        formData.append("image", selectedFile[i]);
      }
    }

    createPost(formData)
      .unwrap()
      .then((response) => {
        dispatch(addPost(response));
        if (fileInputRef.current) {
          setSelectedFile(null);
          fileInputRef.current.value = "";
        }
        toast.success("Post created");
        setBody("");
        setError({});
      })
      .catch((err) => {
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
    selectedFile,
    fileInputRef,
    fileUrl,
    clearAttachment,
  };
};

export default usePostCreate;
