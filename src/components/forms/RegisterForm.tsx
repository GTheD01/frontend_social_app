import CustomForm from "./CustomForm";
import useRegister from "../../hooks/useRegister";

const RegisterForm = () => {
  const { formData, onChange, onSubmit, errors, isLoading } = useRegister();
  const { email, password, last_name, first_name, re_password } = formData;

  const config = [
    {
      labelText: "first_name",
      labelId: "first_name",
      type: "text",
      value: first_name,
      placeholder: "First Name",
      required: true,
      error: errors.first_name,
    },
    {
      labelText: "last_name",
      labelId: "last_name",
      type: "text",
      value: last_name,
      placeholder: "Last Name",
      required: true,
      error: errors.last_name,
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
