import { ChangeEvent, FormEvent, useState } from "react";
import { useCreatePostMutation } from "../redux/features/authApiSlice";
import { toast } from "react-toastify";
import { PostSchema } from "../schemas";

import { z } from "zod";
import { ErrorObject } from "../types/zodTypes";
import { toErrorObject } from "../lib/utils";

const usePostCreate = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [body, setBody] = useState("");
  const [error, setError] = useState<ErrorObject>();

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  let formData = new FormData();
  formData.append("body", body);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      PostSchema.parse({ body });
      setError({});

      createPost(formData)
        .unwrap()
        .then((response) => {
          toast.success("Post created");
          setBody("");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(toErrorObject(e.errors));
      } else {
        setError({ error: "Unknown error" });
      }
    }
  };

  return { body, onChange, onSubmit, isLoading, error };
};

export default usePostCreate;
