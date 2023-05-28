import clsx from "clsx";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

import { Category } from "../../features/categories/types";
import { TransactionType } from "../../features/transactions/types";

type SelectFieldProps = {
  options: Category[] | undefined;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  error: FieldError | undefined;
  registration: Partial<UseFormRegisterReturn>;
  type?: string;
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
  } = props;
  return (
    <div>
      <select
        placeholder={placeholder}
        name="category"
        className={clsx(
          "mt-1 block w-full pl-3 pr-10 py-2 text-base h-11 bg-secondaryGreen text-black focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md",
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options?.map(({ _id, name }) => (
          <option key={_id} value={type === "CATEGORY" ? _id : name}>
            {name}
          </option>
        ))}
      </select>
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
