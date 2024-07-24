import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorObject } from "../types/zodTypes";

import { toErrorObject } from "../lib/utils";
import { z } from "zod";
import { ResetPasswordUserSchema } from "../schemas";
import { useResetPasswordMutation } from "../redux/features/authApiSlice";
import { toast } from "react-toastify";

const useResetPassword = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState<ErrorObject>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const { email } = formData;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      ResetPasswordUserSchema.parse(formData);
      setErrors({});
      resetPassword(email)
        .unwrap()
        .then(() => {
          toast.success("Request sent, check your email for reset link");
        })
        .catch(() => {
          toast.error("Failed to sent request.");
        })
        .finally(() => {
          setFormData({ email: "" });
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

export default useResetPassword;
