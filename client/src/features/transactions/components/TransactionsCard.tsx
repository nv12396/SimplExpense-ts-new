import moment from "moment";

import { HiOutlineDotsVertical } from "react-icons/hi";

type TransactionsCardTypeProps = {
  name: string;
  amount: number;
  category: string;
  date: string;
  type: string;
  AddTransactionModalIsOpen: () => void;
};

export const TransactionsCard = ({
  name,
  amount,
  category,
  date,
  type,
  AddTransactionModalIsOpen,
}: TransactionsCardTypeProps) => {
  return (
    <div className="md:w-full md:min-w-full w-[90vw] flex py-4 text-base items-center bg-white rounded-xl shadow-md justify-around gap-6 p-4">
      <div className="basis-2/6 md:basis-2/6 text-black font-bold ml-4 text-sm md:text-base break-all">
        <p className="break-all]">{name}</p>
      </div>
      <div className="basis-2/6 md:basis-2/6">
        <div className={`w-4 mt-1 flex gap-1 text-sm md:text-base`}>
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
      <div className="hidden md:block basis-2/6 text-black font-bold text-center">
        {category}
      </div>
      <div className="hidden basis-4/6 md:flex justify-between px-4 text-center">
        <div className="flex gap-2 items-center justify-center">
          <p className="text-black text-center xl:ml-8">
            {moment(date).format("D. MMMM YYYY.")}
          </p>
        </div>
      </div>
      <div className="basis-3/6 md:hidden flex justify flex-col text-sm md:text-base">
        <p className="text-black font-bold">{category}</p>
        <p className="text-black xl:ml-8">
          {moment(date).format("D. MMMM YYYY.")}
        </p>
      </div>
      <div className="basis-1/6 flex justify-center items-center">
        <div
          onClick={AddTransactionModalIsOpen}
          className="block w-6 text-blue-400"
        >
          <HiOutlineDotsVertical />
        </div>
      </div>
    </div>
  );
};
