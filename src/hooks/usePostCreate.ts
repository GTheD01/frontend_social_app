import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";

import { ErrorObject } from "../types/zodTypes";
import { useCreatePostMutation } from "../redux/features/postsApiSlice";

import { toast } from "react-toastify";

const usePostCreate = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [body, setBody] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [error, setError] = useState<ErrorObject>();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const clearAttachment = () => {
    if (fileInputRef.current) {
      setSelectedFile(null);
      fileInputRef.current.value = "";
    }
  };

  const imageUploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile!);
      setFileUrl(url);
    }
  }, [selectedFile]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("body", body);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    createPost(formData)
      .unwrap()
      .then((response) => {
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
