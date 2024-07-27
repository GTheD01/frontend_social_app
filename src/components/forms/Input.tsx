interface InputProps {
  value: string;
  label: string;
  placeholder: string;
  error?: string | undefined;
  type: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  value,
  onChange,
  label,
  placeholder,
  type,
  required,
  error,
}: InputProps) => {
  return (
    <div>
      <label
        className={`text-black w-full flex flex-col justify-between items-start relative border border-black rounded-sm`}
        htmlFor={label}
      >
        <span
          className={`absolute text-gray-400 left-2 transition-all duration-200 ease-in-out  ${
            value ? "text-xs top-1" : "top-3 text-sm"
          }`}
        >
          {placeholder}
        </span>
        <input
          autoComplete="off"
          type={type}
          name={label}
          id={label}
          value={value}
          onChange={onChange}
          required={required}
          className={`bg-transparent text-black/70 outline-none w-full z-10 text-lg pr-0 p-2 ${
            value ? "pt-4 pb-0" : ""
          }`}
        />
      </label>
      {error && <p className="text-red-500 text-start">{error}</p>}
    </div>
  );
};

export default Input;
