import CustomForm from "./CustomForm";
import useRegister from "../../hooks/useRegister";

const RegisterForm = () => {
  const { formData, onChange, onSubmit, errors } = useRegister();
  const { email, password, username, fullName } = formData;

  const config = [
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
      labelText: "fullName",
      labelId: "fullName",
      type: "fullName",
      value: fullName,
      placeholder: "Full Name",
      required: true,
      error: errors.fullName,
    },
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
      labelText: "password",
      labelId: "password",
      type: "password",
      value: password,
      placeholder: "Password",
      required: true,
      error: errors.password,
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
