import clsx from "clsx";

import { useAddBudgetModal } from "../../../stores/budgetModal";

import { BudgetDTO } from "../type";

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
    <div className="flex justify-between text-black bg-white shadow-md rounded-xl px-4 py-6">
      <div className="flex flex-col w-full" onClick={addBudgetOpenModal}>
        <div className="grid grid-cols-3 justify-between pb-4">
          <div className="col-span-1 flex flex-col justify-between">
            <div>
              <h1 className="uppercase font-bold text-sm md:text-base">
                {name}
              </h1>
              <p className="pt-2 text-xs md:text-sm mb-10px text-gray-500">
                {category?.name}
              </p>
            </div>
            <p className="">Limit: {limit}</p>
          </div>
          <div className="col-span-2 mx-auto">
            <div className={menuStyle} style={style}>
              {Math.round((amount / limit) * 100)} %
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
