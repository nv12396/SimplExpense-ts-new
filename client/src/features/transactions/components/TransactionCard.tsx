import moment from "moment";

import { HiOutlineDotsVertical } from "react-icons/hi";
import { getCurrency } from "../../../utils/format-currency";

type TransactionsCardTypeProps = {
  name: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  icon: string;
  AddTransactionModalIsOpen: () => void;
};

export const TransactionsCard = ({
  name,
  amount,
  category,
  date,
  type,
  icon,
  AddTransactionModalIsOpen,
}: TransactionsCardTypeProps) => {
  return (
    <div className="md:w-full md:min-w-full grid py-4 text-base bg-white rounded-xl shadow-md justify-around gap-6 p-4 grid-cols-11">
      <div className="col-span-1 text-black m-auto">
        <i className={`${icon}`}></i>
      </div>
      <div className="md:col-span-4 col-span-5 text-black font-bold ml-4 text-sm md:text-base break-all flex flex-col">
        <p className="break-all font-bold">{name}</p>
        <p className="mt-1 text-sm text-gray-500">
          {moment(date).format("D. MMMM YYYY.")}
        </p>
      </div>
      <div className="hidden md:block md:col-span-3">
        <div className="mt-3 flex gap-1 text-sm md:text-base">
          <p className="text-gray-800">{category}</p>
        </div>
      </div>

      <div className="md:hidden col-span-4 items-center flex ml-4">
        <p
          className={`${
            type === "INCOME"
              ? "text-secondaryGreen font-bold"
              : "text-rose-400 font-bold"
          }`}
        >
          {type === "INCOME" ? `+ ${getCurrency()}` : `- ${getCurrency()}`}
        </p>
        <p
          className={`${
            type === "INCOME"
              ? "text-secondaryGreen font-bold"
              : "text-rose-400 font-bold"
          }`}
        >
          {amount}
        </p>
      </div>

      <div className="hidden md:flex col-span-2 text-center justify-center items-center">
        <p
          className={`${
            type === "INCOME"
              ? "text-secondaryGreen font-bold"
              : "text-rose-400 font-bold"
          }`}
        >
          {type === "INCOME" ? `+${getCurrency()} ` : `-${getCurrency()} `}
        </p>
        <p
          className={`${
            type === "INCOME"
              ? "text-secondaryGreen font-bold p-1"
              : "text-rose-400 font-bold p-1"
          }`}
        >
          {amount}
        </p>
      </div>

      <div className="col-span-1 flex justify-end items-center">
        <div
          onClick={AddTransactionModalIsOpen}
          className="block w-10 text-primaryGreen cursor-pointer"
        >
          <HiOutlineDotsVertical />
        </div>
      </div>
    </div>
  );
};
