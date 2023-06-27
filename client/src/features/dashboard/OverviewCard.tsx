import clsx from "clsx";

import {
  WalletIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { useGetTotalAmount } from "../totalAmount/api/getTotalAmount";

type OverviewCardPropsType = {
  title: string;
  amount: number;
  className?: string;
  iconClasses?: string;
  onClick?: () => void;
  AddTotalAmountModalIsOpen?: () => void;
};

export const OverviewCard = ({
  title,
  amount,
  className,
  iconClasses,
  onClick,
  AddTotalAmountModalIsOpen,
}: OverviewCardPropsType) => {
  const { data: totalAmount } = useGetTotalAmount();
  return (
    <div
      className={clsx(
        "flex items-center bg-white gap-4 md:gap-6 rounded-lg shadow-md py-4 w-70 md:w-80",
        className
      )}
      onClick={onClick}
    >
      <div
        className={clsx("w-8 ml-4 md:w-12 p-1 md:ml-8 rounded-md", iconClasses)}
      >
        <WalletIcon />
      </div>
      <div className="flex flex-col">
        <h1 className="stat-title text-gray-500 text-sm">{title}</h1>
        <div className="flex flex-start items-start justify-start gap-1">
          <p className="text-black font-bold text-xl md:text-2xl text-start">
            $
          </p>
          <p className="text-lg font-extrabold md:stat-value text-gray-800">
            {amount}
          </p>
          {title === "TOTAL AMOUNT" && (
            <div
              className="w-6 flex items-center justify-center ml-2 text-black mt-1 cursor-pointer"
              onClick={AddTotalAmountModalIsOpen}
            >
              {totalAmount?.amount === 0 ? (
                <PlusCircleIcon />
              ) : (
                <PencilSquareIcon />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
