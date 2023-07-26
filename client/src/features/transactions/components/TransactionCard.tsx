import moment from "moment";

import { HiOutlineDotsVertical } from "react-icons/hi";

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
    <div className="md:w-full md:min-w-full w-[90vw] grid py-4 text-base bg-white rounded-xl shadow-md justify-around gap-6 p-4 grid-cols-11">
      <div className="col-span-1 text-black m-auto">
        <i className={`${icon}`}></i>
      </div>
      <div className="col-span-4 text-black font-bold ml-4 text-sm md:text-base break-all flex flex-col">
        <p className="break-all font-bold">{name}</p>
        <p className="text-gray-400">{category}</p>
      </div>
      <div className="hidden md:block md:col-span-3">
        <div className="w-4 mt-3 flex gap-1 text-sm md:text-base">
          <p
            className={`${
              type === "INCOME"
                ? "text-secondaryGreen font-bold"
                : "text-rose-600 font-bold"
            }`}
          >
            {type === "INCOME" ? "+$" : "-$"}
          </p>
          <p
            className={`${
              type === "INCOME"
                ? "text-secondaryGreen font-bold"
                : "text-rose-600 font-bold"
            }`}
          >
            {amount}
          </p>
        </div>
      </div>

      <div className="md:hidden col-span-5 flex flex-col ml-4">
        <div className="w-4 md:mt-3 flex gap-1 text-md md:text-base">
          <p
            className={`${
              type === "INCOME"
                ? "text-secondaryGreen font-bold"
                : "text-rose-600 font-bold"
            }`}
          >
            {type === "INCOME" ? "+$" : "-$"}
          </p>
          <p
            className={`${
              type === "INCOME"
                ? "text-secondaryGreen font-bold"
                : "text-rose-600 font-bold"
            }`}
          >
            {amount}
          </p>
        </div>
        <p className="md:mt-3 text-sm text-gray-500">
          {moment(date).format("D. MMMM YYYY.")}
        </p>
      </div>

      <div className="hidden md:block col-span-2 text-center">
        <p className="text-black mt-3 text-sm">
          {moment(date).format("D. MMMM YYYY.")}
        </p>
      </div>

      <div className="col-span-1 flex justify-end items-center">
        <div
          onClick={AddTransactionModalIsOpen}
          className="block w-6 text-blue-400 cursor-pointer"
        >
          <HiOutlineDotsVertical />
        </div>
      </div>
    </div>
  );
};
