import type { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import VisibilityInput from './VisibilityInput';
import LocationInput from './LocationInput';
import { User } from '@/types/user';

interface DefaultField {
  label: string;
  placeholder: string;
  error?: FieldError;
}

interface LocationField extends DefaultField {
  name: keyof Pick<User, 'location'>;
  setValue: (name: 'location', value: string) => void;
  setError: (
    name: 'location',
    error: { type: string; message: string },
  ) => void;
  clearErrors: (name: 'location') => void;
}

interface OtherField extends DefaultField {
  name: keyof Omit<User, 'location'> | 'passwordConfirmation';
  register: UseFormRegisterReturn;
}

type FormFieldProps = LocationField | OtherField;

const FormField = (props: FormFieldProps) => {
  const inputStyle =
    'p-[14px] rounded-lg border ' +
    `${props.error ? 'border-error' : 'border-gray-200 focus:border-orange-300'} ` +
    'outline-none text-lg lg:text-xl placeholder:text-gray-400 transition duration-200';
  const errorStyle =
    'h-[22px] lg:h-[26px] mr-2 lg:mr-3 ' +
    'text-right text-sm lg:text-lg text-error font-medium';

  let Input;
  switch (props.name) {
    case 'location':
      Input = (
        <LocationInput
          setValue={props.setValue}
          setError={props.setError}
          clearErrors={props.clearErrors}
          placeholder={props.placeholder}
          className={`w-full pl-[52px] lg:pl-16 ${inputStyle} cursor-pointer`}
        />
      );
      break;
    case 'password':
    case 'passwordConfirmation':
      Input = (
        <VisibilityInput
          id={props.name}
          placeholder={props.placeholder}
          {...props.register}
          className={`w-full ${inputStyle}`}
        />
      );
      break;
    default:
      Input = (
        <input
          type={props.name === 'email' ? 'email' : 'text'}
          id={props.name}
          placeholder={props.placeholder}
          {...props.register}
          className={`mb-1 ${inputStyle}`}
        />
      );
  }

  return (
    <>
      <label
        htmlFor={props.name}
        className="mb-2 ml-2 lg:ml-3 text-md lg:text-xl"
      >
        {props.label}
      </label>
      {Input}
      <span className={errorStyle}>{props.error?.message}</span>
    </>
  );
};

export default FormField;
