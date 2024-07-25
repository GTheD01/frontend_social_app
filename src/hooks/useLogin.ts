import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorObject } from "../types/zodTypes";

import { toErrorObject } from "../lib/utils";
import { z } from "zod";
import { LoginUserSchema } from "../schemas";
import { useLoginMutation } from "../redux/features/authApiSlice";
import { useAppDispatch } from "../redux/hooks";
import { setAuth } from "../redux/features/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorObject>({});
  const { email, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      LoginUserSchema.parse(formData);
      setErrors({});
      login({ email, password })
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast.success("Logged in");
          navigate("/home");
        })
        .catch(() => {
          toast.error("Failed to log in");
        });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setErrors(toErrorObject(e.errors));
      } else {
        setErrors({ error: "Unknown error" });
      }
    }
  };

  return {
    formData,
    onChange,
    onSubmit,
    errors,
    isLoading,
  };
};

export default useLogin;
