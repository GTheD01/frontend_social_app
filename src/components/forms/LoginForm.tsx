import { ChangeEvent, FormEvent } from "react";
import { ErrorObject } from "../../types/zodTypes";
import CustomForm from "./CustomForm";

type LoginFormData = {
  email: string;
  password: string;
};

interface LoginFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors?: ErrorObject;
  formData: LoginFormData;
}

const LoginForm = ({
  errors,
  onChange,
  onSubmit,
  formData,
}: LoginFormProps) => {
  const { email, password } = formData;

  const config = [
    {
      labelText: "email",
      labelId: "email",
      type: "email",
      value: email,
      placeholder: "Enter your email",
      required: true,
    },
    {
      labelText: "password",
      labelId: "password",
      type: "password",
      value: password,
      placeholder: "Enter your password",
      required: true,
    },
  ];

  return (
    <CustomForm
      btnText="Log in"
      config={config}
      isLoading={false}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
