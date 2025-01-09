import { type FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

const InputField = ({
  name,
  placeholder,
  register,
  error,
}: InputFieldProps) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input type="text" id={name} placeholder={placeholder} {...register} />
      {error && <span>{error.message}</span>}
    </div>
  );
};

export default InputField;
