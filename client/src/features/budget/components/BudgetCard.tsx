import clsx from "clsx";

import { BudgetDTO } from "../type";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useAddBudgetModal } from "../../../stores/budgetModal";

const BudgetCard = ({ name, category, amount, limit }: BudgetDTO) => {
  const menuStyle = clsx({
    ["radial-progress text-blue-400"]: amount / limit < 0.8,
    ["radial-progress text-red-400"]: amount / limit > 0.8,
  });
  const { addBudgetOpenModal } = useAddBudgetModal();

  const style = {
    "--value": (amount / limit) * 100,
    "--size": "8rem",
  } as React.CSSProperties;

  return (
    <div className="flex justify-between gap-20 text-black bg-white shadow-md rounded-xl p-4">
      <div className="flex flex-col w-full ">
        <div className="flex justify-between ">
          <div>
            <h1 className="uppercase font-bold text-sm md:text-base">{name}</h1>
            <p className="pt-2 text-xs md:text-sm mb-10px text-gray-500">
              Category: {category?.name}
            </p>
          </div>
          <div className="flex gap-4">
            <div
              className="flex justify-center items-center cursor-pointer"
              onClick={addBudgetOpenModal}
            >
              {<HiOutlineDotsVertical />}
            </div>
          </div>
        </div>
        <div className="w-full mb-4 flex items-center justify-center">
          <div className={menuStyle} style={style}>
            {Math.round((amount / limit) * 100)} %
          </div>
        </div>
        <div className="flex justify-between">
          <p className="m-2">Amount: {amount}</p>
          <p className="m-2">Limit: {limit}</p>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
