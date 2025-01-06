import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import VisibilityInput from './VisibilityInput';

interface FormFieldProps {
  name: string;
  label: string;
  comment?: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const FormField = ({
  name,
  label,
  comment,
  placeholder,
  register,
  error,
}: FormFieldProps) => {
  const requiredStyle = !register.required
    ? "after:content-['*'] after:inline after:ml-1 after:text-orange-300"
    : '';
  const inputStyle =
    'p-[14px] rounded-lg bg-background-200 border outline-none ' +
    `${error ? 'border-error' : 'border-background-200 focus:border-orange-300'} ` +
    'text-lg lg:text-xl text-black-400 placeholder:text-gray-400 transition duration-200';
  const errorStyle =
    'h-[22px] lg:h-[26px] mr-2 lg:mr-3 ' +
    'text-right text-sm lg:text-lg text-error font-medium';

  let Input;
  switch (name) {
    case 'password':
      Input = (
        <>
          <VisibilityInput
            id={name}
            placeholder={placeholder}
            {...register}
            className={`w-full ${inputStyle}`}
          />
        </>
      );
      break;
    default:
      Input = (
        <input
          type="text"
          id={name}
          placeholder={placeholder}
          {...register}
          className={`mb-1 ${inputStyle} before:content-[*]`}
        />
      );
  }

  return (
    <>
      <label
        htmlFor={name}
        className={`mb-2 ml-2 lg:ml-3 text-md lg:text-xl font-medium ${requiredStyle}`}
      >
        {label}
      </label>
      {Input}
      {comment && (
        <span className="ml-2 text-xs text-gray-400">
          * 지원내역 확인에 사용됩니다.
        </span>
      )}
      <span className={errorStyle}>{error?.message}</span>
    </>
  );
};

export default FormField;
