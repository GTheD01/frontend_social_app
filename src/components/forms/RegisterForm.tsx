import { ChangeEvent, FormEvent } from "react";

import { ErrorObject } from "../../types/zodTypes";
import CustomForm from "./CustomForm";

type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  fullName: string;
};

interface RegisterFormProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  errors?: ErrorObject;
  formData: RegisterFormData;
}

const RegisterForm = ({
  errors,
  onChange,
  onSubmit,
  formData,
}: RegisterFormProps) => {
  const { email, password, username, fullName } = formData;

  const config = [
    {
      labelText: "email",
      labelId: "email",
      type: "email",
      value: email,
      placeholder: "Email",
      required: true,
    },
    {
      labelText: "fullName",
      labelId: "fullName",
      type: "fullName",
      value: fullName,
      placeholder: "Full Name",
      required: true,
    },
    {
      labelText: "username",
      labelId: "username",
      type: "text",
      value: username,
      placeholder: "Username",
      required: true,
    },
    {
      labelText: "password",
      labelId: "password",
      type: "password",
      value: password,
      placeholder: "Password",
      required: true,
    },
  ];

  return (
    <CustomForm
      btnText="Sign up"
      config={config}
      isLoading={false}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
