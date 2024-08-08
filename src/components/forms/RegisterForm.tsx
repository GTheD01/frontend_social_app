import CustomForm from "./CustomForm";
import useRegister from "../../hooks/useRegister";

const RegisterForm = () => {
  const { formData, onChange, onSubmit, errors, isLoading } = useRegister();
  const { email, password, username, full_name, re_password } = formData;

  const config = [
    {
      labelText: "username",
      labelId: "username",
      type: "text",
      value: username,
      placeholder: "Username",
      required: true,
      error: errors.username,
    },
    {
      labelText: "full_name",
      labelId: "full_name",
      type: "text",
      value: full_name,
      placeholder: "Full Name",
      required: true,
      error: errors.full_name,
    },
    {
      labelText: "email",
      labelId: "email",
      type: "email",
      value: email,
      placeholder: "Email",
      required: true,
      error: errors.email,
    },

    {
      labelText: "password",
      labelId: "password",
      type: "password",
      value: password,
      placeholder: "Password",
      required: true,
      error: errors.password,
    },
    {
      labelText: "re_password",
      labelId: "re_password",
      type: "password",
      value: re_password,
      placeholder: "Repeat password",
      required: true,
      error: errors.re_password,
    },
  ];

  return (
    <CustomForm
      btnText="Sign up"
      config={config}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default RegisterForm;
