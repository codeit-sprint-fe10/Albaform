import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import VisibilityInput from './VisibilityInput';

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormField = ({
  name,
  label,
  placeholder,
  register,
  error,
}: FormFieldProps) => {
  const inputStyle =
    'p-[14px] mb-1 rounded-lg border ' +
    `${error ? 'border-error' : 'border-gray-200 focus:border-orange-300'} ` +
    'outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200';
  const errorStyle =
    'h-[22px] lg:h-[26px] mr-2 lg:mr-3 ' +
    'text-right text-sm lg:text-lg text-error font-medium';

  return (
    <>
      <label htmlFor={name} className="mb-2 ml-2 lg:ml-3 text-md lg:text-xl">
        {label}
      </label>
      {name.includes('password') ? (
        <VisibilityInput
          id={name}
          placeholder={placeholder}
          {...register}
          className={`w-full ${inputStyle}`}
        />
      ) : (
        <input
          type={name === 'email' ? 'email' : 'text'}
          id={name}
          placeholder={placeholder}
          {...register}
          className={`${inputStyle}`}
        />
      )}
      <span className={errorStyle}>{error?.message}</span>
    </>
  );
};

export default FormField;
