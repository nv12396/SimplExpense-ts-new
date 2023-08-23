import clsx from "clsx";

import {
  WalletIcon,
  PlusCircleIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { FcComboChart } from "react-icons/fc";

import { useGetTotalAmount } from "../totalAmount/api/getTotalAmount";
import { getCurrency } from "../../utils/format-currency";

type OverviewCardPropsType = {
  title: string;
  amount: number;
  className?: string;
  iconClasses?: string;
  onClick?: () => void;
  AddTotalAmountModalIsOpen?: () => void;
  date?: string;
};

export const OverviewCardDemo = ({
  title,
  amount,
  className,
  iconClasses,
  onClick,
  AddTotalAmountModalIsOpen,
  date,
}: OverviewCardPropsType) => {
  const { data: totalAmount } = useGetTotalAmount();
  return (
    <div
      className={clsx("flex flex-col rounded-lg shadow-md md:w-80", className)}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex flex-col pl-1 lg:pl-3 pt-1">
          <h1 className="stat-title text-black md:text-lg font-bold">
            {title}
          </h1>
          <p className="text-xs lg:text-base">{date}</p>
        </div>
        <div
          className={clsx(
            "w-8 md:w-12 p-3 mr-3 md:ml-8 rounded-md",
            iconClasses
          )}
        >
          <WalletIcon />
        </div>
      </div>
      <div className="divider px-8"></div>

      <div className="flex pb-4 pl-2 justify-between">
        <div className="flex gap-2">
          <p className="text-black font-bold text-xl md:text-2xl text-start">
            {getCurrency()}
          </p>
          <p className="text-xl lg:text-3xl font-bold text-black">{amount}</p>

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
        <div className="pr-3">
          <FcComboChart size="35px" />
        </div>
      </div>
    </div>
  );
};
