import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { FieldName, CommonFieldName, CustomFieldName } from '@/types/form';
import VisibilityInput from './VisibilityInput';
import LocationInput from './LocationInput';
import ResumeInput from './ResumeInput';

interface DefaultFieldParam<Name extends FieldName> {
  name: Name;
  label: string;
  placeholder: string;
  comment?: string;
  required?: true;
  error?: FieldError;
  design: 'solid' | 'outlined';
}

interface CommonFieldParam extends DefaultFieldParam<CommonFieldName> {
  register: UseFormRegisterReturn;
}

type CustomFieldParam = DefaultFieldParam<CustomFieldName>;

type FormFieldProps = CommonFieldParam | CustomFieldParam;

const FormField = (props: FormFieldProps) => {
  const requiredStyle = props.required
    ? "after:content-['*'] after:inline after:ml-1 after:text-orange-300"
    : '';
  const inputStyle =
    `p-[14px] rounded-lg ${props.design === 'solid' ? 'bg-background-200' : ''} border outline-none ` +
    `${props.error ? 'border-error' : `${props.design === 'solid' ? 'border-background-200' : 'border-gray-200'} focus:border-orange-300`} ` +
    'text-lg lg:text-xl text-black-400 placeholder:text-gray-400 transition duration-200';
  const errorStyle =
    'h-[22px] lg:h-[26px] mr-2 lg:mr-3 ' +
    'text-right text-sm lg:text-lg text-error font-medium';

  let Input;
  switch (props.name) {
    case 'password':
    case 'currentPassword':
    case 'newPassword':
    case 'passwordConfirmation':
      Input = (
        <>
          <VisibilityInput
            id={props.name}
            placeholder={props.placeholder}
            {...props.register}
            className={`w-full ${inputStyle}`}
          />
        </>
      );
      break;
    case 'location':
      Input = (
        <LocationInput
          placeholder={props.placeholder}
          className={`w-full ${inputStyle} cursor-pointer p-[14px] lg:p-[14px]`}
        />
      );
      break;
    case 'resumeId':
    case 'resumeName':
      Input = (
        <ResumeInput
          placeholder={props.placeholder}
          className={`w-full ${inputStyle} underline placeholder-shown:no-underline`}
        />
      );
      break;
    case 'introduction':
      Input = (
        <textarea
          id={props.name}
          rows={4}
          maxLength={200}
          placeholder={props.placeholder}
          {...props.register}
          className={`${inputStyle} resize-none custom-scrollbar`}
        />
      );
      break;
    default:
      Input = (
        <input
          type="text"
          id={props.name}
          placeholder={props.placeholder}
          {...(props as CommonFieldParam).register}
          className={`mb-1 ${inputStyle}`}
        />
      );
  }

  return (
    <>
      <label
        htmlFor={props.name}
        className={`mb-2 ml-2 lg:ml-3 text-md lg:text-xl font-medium ${requiredStyle}`}
      >
        {props.label}
      </label>
      {Input}
      {props.comment && (
        <span className="ml-2 text-xs text-gray-400">{props.comment}</span>
      )}
      <span className={errorStyle}>{props.error?.message}</span>
    </>
  );
};

export default FormField;
