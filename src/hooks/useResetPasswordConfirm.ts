import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useResetPasswordConfirmMutation } from "../redux/features/authApiSlice";

import { z } from "zod";
import { ErrorObject } from "../types/zodTypes";
import { toErrorObject } from "../lib/utils";
import { ResetPasswordConfirmProps } from "../types/types";
import { ResetPasswordConfirmSchema } from "../schemas";
import { toast } from "react-toastify";

const useResetPasswordConfirm = ({ uid, token }: ResetPasswordConfirmProps) => {
  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState<ErrorObject>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const { new_password, re_new_password } = formData;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      ResetPasswordConfirmSchema.parse(formData);
      setErrors({});
      resetPasswordConfirm({ uid, token, new_password, re_new_password })
        .unwrap()
        .then(() => {
          toast.success("Password successfully changed");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Failed to change password.");
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

export default useResetPasswordConfirm;
