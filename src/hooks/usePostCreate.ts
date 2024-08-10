import { ChangeEvent, FormEvent, useState } from "react";
import { useCreatePostMutation } from "../redux/features/authApiSlice";
import { toast } from "react-toastify";

const usePostCreate = () => {
  const [createPost, { isLoading }] = useCreatePostMutation();
  const [body, setBody] = useState("");

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  let formData = new FormData();
  formData.append("body", body);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createPost(formData)
      .unwrap()
      .then((response) => {
        toast.success("Post created");
        setBody("");
      })
      .catch((err) => {
        console.log(err);
        // toast.success(err);
      });
  };

  return { body, onChange, onSubmit, isLoading };
};

export default usePostCreate;
