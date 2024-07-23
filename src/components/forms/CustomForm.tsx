import { ChangeEvent, FormEvent } from "react";
import { Form } from "react-router-dom";
import Input from "../Input";

interface Config {
  labelText: string;
  labelId: string;
  type: string;
  value: string;
  placeholder: string;
  required?: boolean;
  error?: string | undefined;
}

interface CustomFormProps {
  config: Config[];
  isLoading: boolean;
  btnText: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  method?: "POST" | "GET" | "PUT" | "PATCH";
}

const CustomForm = ({
  config,
  isLoading,
  btnText,
  onChange,
  onSubmit,
  method = "POST",
}: CustomFormProps) => {
  return (
    <Form onSubmit={onSubmit} method={method} className="space-y-5">
      {config.map((input) => (
        <Input
          type={input.type}
          key={input.labelId}
          onChange={onChange}
          value={input.value}
          placeholder={input.placeholder}
          label={input.labelText}
          required={input.required}
          error={input.error}
        />
      ))}
      <div className="space-y-0">
        <button
          disabled={isLoading}
          type="submit"
          className="text-blue-500 bg-white p-2 rounded-2xl w-full hover:bg-gray-100 font-bold tracking-wide disabled:bg-white/30 disabled:text-blue-500/60 mb-4"
        >
          {isLoading ? "Loading..." : btnText}
        </button>
      </div>
    </Form>
  );
};

export default CustomForm;
