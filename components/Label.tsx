interface LabelProps {
  label: string;
  id?: string;
  required?: boolean;
  className?: string;
}

const Label = ({ label, id, required, className }: LabelProps) => {
  return (
    <label
      className={`inline-block font-medium text-md lg:text-xl text-black-400 ${className}`}
      htmlFor={id}
    >
      {label}
      {required && (
        <span className="text-orange-300 pl-[2px] align-middle">*</span>
      )}
    </label>
  );
};

export default Label;
