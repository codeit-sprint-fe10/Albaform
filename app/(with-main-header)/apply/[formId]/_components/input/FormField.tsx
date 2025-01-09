import type { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import {
  FieldName,
  CommonFieldName,
  CustomFieldName,
  CustomSetValue,
  CustomSetError,
  CustomClearErrors,
} from '@/types/form';
import ResumeInput from './ResumeInput';
import VisibilityInput from './VisibilityInput';

interface DefaultFieldParam<N extends FieldName> {
  name: N;
  label: string;
  placeholder: string;
  comment?: string;
  required?: true;
  error?: FieldError;
}

interface CommonFieldParam extends DefaultFieldParam<CommonFieldName> {
  register: UseFormRegisterReturn;
}

interface CustomFieldParam extends DefaultFieldParam<CustomFieldName> {
  setValue: CustomSetValue<CustomFieldName>;
  setError: CustomSetError<CustomFieldName>;
  clearErrors: CustomClearErrors<CustomFieldName>;
}

type FormFieldProps = CommonFieldParam | CustomFieldParam;

const FormField = (props: FormFieldProps) => {
  const requiredStyle = props.required
    ? "after:content-['*'] after:inline after:ml-1 after:text-orange-300"
    : '';
  const inputStyle =
    'p-[14px] rounded-lg bg-background-200 border outline-none ' +
    `${props.error ? 'border-error' : 'border-background-200 focus:border-orange-300'} ` +
    'text-lg lg:text-xl text-black-400 placeholder:text-gray-400 transition duration-200';
  const errorStyle =
    'h-[22px] lg:h-[26px] mr-2 lg:mr-3 ' +
    'text-right text-sm lg:text-lg text-error font-medium';

  let Input;
  switch (props.name) {
    case 'resumeId':
    case 'resumeName':
      Input = (
        <ResumeInput
          placeholder={props.placeholder}
          setValue={props.setValue}
          setError={props.setError}
          clearErrors={props.clearErrors}
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
    case 'password':
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
      break;
    default:
      Input = (
        <input
          type="text"
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
