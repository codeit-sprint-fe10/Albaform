import { type FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

const InputField = ({
  id,
  label,
  placeholder,
  register,
  error,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-2 font-regular text-md lg:text-lg">
      <label htmlFor={id} className="text-black-400">
        {label}
      </label>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        {...register}
        className="text-gray-400 p-3 bg-background-200 rounded-lg"
      />
      {error && <span className="text-error ml-2">{error.message}</span>}
    </div>
  );
};

export default InputField;
