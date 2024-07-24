import CustomForm from "./CustomForm";
import useResetPasswordConfirm from "../../hooks/useResetPasswordConfirm";
import { ResetPasswordConfirmProps } from "../../types/types";

const useResetPasswordConfirmForm = ({
  uid,
  token,
}: ResetPasswordConfirmProps) => {
  const { formData, onChange, onSubmit, errors, isLoading } =
    useResetPasswordConfirm({ uid, token });
  const { new_password, re_new_password } = formData;

  const config = [
    {
      labelText: "new_password",
      labelId: "new_password",
      type: "password",
      value: new_password,
      placeholder: "Password",
      required: true,
      error: errors.new_password,
    },
    {
      labelText: "re_new_password",
      labelId: "re_new_password",
      type: "password",
      value: re_new_password,
      placeholder: "Repeat password",
      required: true,
      error: errors.re_new_password,
    },
  ];

  return (
    <CustomForm
      btnText="Change password"
      config={config}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default useResetPasswordConfirmForm;
