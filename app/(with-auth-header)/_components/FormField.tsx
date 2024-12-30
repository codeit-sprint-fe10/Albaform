import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import VisibilityInput from './VisibilityInput';
import LocationInput from './LocationInput';

interface FormFieldProps {
  name: string;
  label: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
  setValue?: (name: 'location', value: string) => void;
  setError?: (
    name: 'location',
    error: { type: string; message: string },
  ) => void;
  clearErrors?: (name: 'location') => void;
}

const FormField = ({
  name,
  label,
  placeholder,
  register,
  error,
  setValue,
  setError,
  clearErrors,
}: FormFieldProps) => {
  const inputStyle =
    'p-[14px] rounded-lg border ' +
    `${error ? 'border-error' : 'border-gray-200 focus:border-orange-300'} ` +
    'outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200';
  const errorStyle =
    'h-[22px] lg:h-[26px] mr-2 lg:mr-3 ' +
    'text-right text-sm lg:text-lg text-error font-medium';

  let Input;
  switch (name) {
    case 'location':
      Input = (
        <LocationInput
          setValue={setValue!}
          setError={setError!}
          clearErrors={clearErrors!}
          placeholder={placeholder}
          className={`w-full pl-[52px] lg:pl-16 ${inputStyle} cursor-pointer`}
        />
      );
      break;
    case 'password':
    case 'passwordConfirmation':
      Input = (
        <VisibilityInput
          id={name}
          placeholder={placeholder}
          {...register}
          className={`w-full ${inputStyle}`}
        />
      );
      break;
    default:
      Input = (
        <input
          type={name === 'email' ? 'email' : 'text'}
          id={name}
          placeholder={placeholder}
          {...register}
          className={`mb-1 ${inputStyle}`}
        />
      );
  }

  return (
    <>
      <label htmlFor={name} className="mb-2 ml-2 lg:ml-3 text-md lg:text-xl">
        {label}
      </label>
      {Input}
      <span className={errorStyle}>{error?.message}</span>
    </>
  );
};

export default FormField;
