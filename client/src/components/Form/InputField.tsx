import clsx from "clsx";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type InputFieldProps = {
  type?: "text" | "number" | "email" | "password" | "date" | "custom" | "tel";
  placeholder?: string;
  className?: string;
  error: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
  defaultValue?: string | number | readonly string[] | undefined;
  iconClass?: string;
  errorClass?: string;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = "text",
    className,
    registration,
    placeholder,
    error,
    defaultValue,
    iconClass,
    errorClass,
  } = props;

  return (
    <div className="flex relative">
      <i
        className={clsx(
          "absolute top-1/2 transform -translate-y-1/2 pb-2 pointer-events-none",
          iconClass
        )}
      ></i>
      <input
        placeholder={placeholder}
        type={type}
        className={clsx(
          "input input-md mb-2 bg-white text-black pl-12 border-1 border-gray-200 shadow-sm",
          className
        )}
        {...registration}
        defaultValue={defaultValue}
      />

      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className={clsx(
            "text-sm font-semibold text-red-500 absolute bottom-[-15px]",
            errorClass
          )}
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
