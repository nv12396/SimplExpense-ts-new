import clsx from "clsx";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

import { Category } from "../../features/categories/types";
import { Currency } from "../../features/auth/components/RegisterForm";

type SelectFieldProps = {
  options: Category[] | Currency[] | undefined;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  error: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
  type?: string;
  errorClass?: string;
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    options,
    className,
    placeholder,
    defaultValue,
    registration,
    error,
    type,
    errorClass,
  } = props;
  return (
    <div className="relative">
      <select
        placeholder={placeholder}
        name="category"
        className={clsx(
          "select select-sm bg-[#4ac5b6] max-w-xs mt-1 block w-full pl-3 pr-10 py-2 text-base h-11 text-black focus:outline-none sm:text-sm rounded-md",
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options?.map(({ _id, name }) => (
          <>
            <option value="" disabled selected>
              {defaultValue
                ? defaultValue
                : type === "CATEGORY"
                ? "Select category"
                : "Select type"}
            </option>

            <option
              className="bg-white"
              key={_id}
              value={defaultValue || type === "CATEGORY" ? _id : name}
              placeholder={defaultValue}
            >
              {name}
            </option>
          </>
        ))}
      </select>
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
