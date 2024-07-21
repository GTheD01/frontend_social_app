import CustomForm from "./CustomForm";
import useLogin from "../../hooks/useLogin";

const LoginForm = () => {
  const { formData, onChange, onSubmit, errors } = useLogin();
  const { email, password } = formData;

  const config = [
    {
      labelText: "email",
      labelId: "email",
      type: "email",
      value: email,
      placeholder: "Enter your email",
      required: true,
      error: errors.email,
    },
    {
      labelText: "password",
      labelId: "password",
      type: "password",
      value: password,
      placeholder: "Enter your password",
      required: true,
      error: errors.password,
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
