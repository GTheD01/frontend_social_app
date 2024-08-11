import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useCreatePostMutation } from "../redux/features/authApiSlice";
import { toast } from "react-toastify";
import { PostSchema } from "../schemas";

import { z } from "zod";
import { ErrorObject } from "../types/zodTypes";
import { toErrorObject } from "../lib/utils";

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
      })
      .catch((err) => {
        setError({ error: err });
        console.log(err);
      });
  };

  return {
    body,
    onChange,
    onSubmit,
    isLoading,
    error,
    imageUploadHandler,
    selectedFile,
    fileInputRef,
    fileUrl,
  };
};

export default usePostCreate;
