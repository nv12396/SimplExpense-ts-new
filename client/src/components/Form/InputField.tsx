import clsx from "clsx";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type InputFieldProps = {
  type?: "text" | "number" | "email" | "password" | "date" | "custom" | "tel";
  placeholder?: string;
  className?: string;
  error: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string | number | readonly string[] | undefined;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    className,
    registration,
    placeholder,
    error,
    defaultValue,
  } = props;

  return (
    <div className="flex flex-col">
      <input
        placeholder={placeholder}
        type={type}
        className={clsx("input input-bordered mb-2", className)}
        {...registration}
        defaultValue={defaultValue}
      />

      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-sm font-semibold text-red-500"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
