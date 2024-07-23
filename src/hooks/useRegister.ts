import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorObject } from "../types/zodTypes";
import { RegisterUserSchema } from "../schemas";
import { toErrorObject } from "../lib/utils";
import { z } from "zod";
import { useRegisterMutation } from "../redux/features/authApiSlice";
import { useAppDispatch } from "../redux/hooks";
import { setAuth } from "../redux/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const useRegister = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
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

  const { email, first_name, password, re_password, last_name } = formData;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      RegisterUserSchema.parse(formData);
      setErrors({});
      register({ first_name, last_name, password, re_password, email })
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
