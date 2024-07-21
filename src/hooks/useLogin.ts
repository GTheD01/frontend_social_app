import { ChangeEvent, FormEvent, useState } from "react";
import { ErrorObject } from "../types/zodTypes";

import { toErrorObject } from "../lib/utils";
import { z } from "zod";
import { LoginUserSchema } from "../schemas";

const useLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorObject>({});

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      LoginUserSchema.parse(formData);
      setErrors({});
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
  };
};

export default useLogin;
