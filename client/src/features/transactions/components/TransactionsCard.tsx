import moment from "moment";

import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { BiDotsVerticalRounded } from "react-icons/bi";

type TransactionsCardTypeProps = {
  name: string;
  amount: number;
  description: string;
  date: Date;
  type: string;
};

export const TransactionsCard = ({
  name,
  amount,
  description,
  date,
  type,
}: TransactionsCardTypeProps) => {
  return (
    <div className="w-full min-w-full flex border-b-2 border-gray-700 py-4 text-base">
      <div className="basis-1/5">{name.toUpperCase()}</div>
      <div className="basis-1/5">
        <div className={`w-4 mt-1 flex gap-2 `}>
          <p
            className={`${
              type === "INCOME" ? "text-secondaryGreen" : "text-rose-600"
            }`}
          >
            {type === "INCOME" ? "$" : "-$"}
          </p>
          <p>{amount}</p>
        </div>
      </div>
      <div className="basis-2/5">{description}</div>
      <div className="basis-1/5 flex justify-between px-4">
        <div className="flex gap-2">
          <div className="w-4 mt-1 text-secondaryGreen">
            <CalendarDaysIcon />
          </div>
          <p>{moment(date).format("D. MMMM YYYY.")}</p>
        </div>
        <div className="mt-1 text-secondaryGreen cursor-pointer">
          <BiDotsVerticalRounded />
        </div>
      </div>
    </div>
  );
};
