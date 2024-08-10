import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { useRegisterMutation } from "../redux/features/authApiSlice";
import { setAuth } from "../redux/features/authSlice";

import { z } from "zod";
import { ErrorObject } from "../types/zodTypes";
import { toErrorObject } from "../lib/utils";
import { RegisterUserSchema } from "../schemas";

import { toast } from "react-toastify";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    full_name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [errors, setErrors] = useState<ErrorObject>({});
  const [register, { isLoading }] = useRegisterMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const { email, full_name, password, re_password, username } = formData;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      RegisterUserSchema.parse(formData);
      setErrors({});
      register({ full_name, username, password, re_password, email })
        .unwrap()
        .then(() => {
          dispatch(setAuth());
          toast.success("Please check email to verify account");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Failed to register account");
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

export default useRegister;
