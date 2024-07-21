import useResetPassword from "../../hooks/useResetPassword";
import CustomForm from "./CustomForm";

const ResetPasswordForm = () => {
  const { formData, onChange, onSubmit, errors } = useResetPassword();
  const { email } = formData;

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
  ];
  return (
    <CustomForm
      config={config}
      onChange={onChange}
      onSubmit={onSubmit}
      btnText="Send email"
      isLoading={false}
    />
  );
};

export default ResetPasswordForm;
