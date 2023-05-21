import clsx from "clsx";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type InputFieldProps = {
  type?: "text" | "number" | "email" | "password";
  placeholder?: string;
  className?: string;
  error: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = "text", className, registration, placeholder, error } = props;
  return (
    <>
      <input
        placeholder={placeholder}
        type={type}
        className={clsx("input input-bordered", className)}
        {...registration}
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
    </>
  );
};
