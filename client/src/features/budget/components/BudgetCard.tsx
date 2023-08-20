import clsx from "clsx";

import { useAddBudgetModal } from "../../../stores/budgetModal";

import { BudgetDTO } from "../type";
import { getCurrency } from "../../../utils/format-currency";
import { HiOutlineDotsVertical } from "react-icons/hi";

const BudgetCard = ({ name, category, amount, limit }: BudgetDTO) => {
  const menuStyle = clsx({
    ["radial-progress text-primaryGreen"]: amount / limit < 0.8,
    ["radial-progress text-[#df6c4f]"]: amount / limit > 0.8,
  });
  const { addBudgetOpenModal } = useAddBudgetModal();

  const style = {
    "--value": (amount / limit) * 100,
    "--size": "11rem",
    "--thickness": "18px",
  } as React.CSSProperties;

  return (
    <div className="md:carousel-item">
      <div className="grid grid-rows-8 border rounded-xl bg-white shadow w-[350px] md:w-[380px] md:min-w-[380px] md:max-w-[380px]">
        <div className="flex justify-between">
          <div className="flex flex-col p-6">
            <p className="text-black grid-span-1">{name}</p>
            <p className="text-sm">{category?.name}</p>
          </div>
          <div
            onClick={addBudgetOpenModal}
            className="block text-primaryGreen cursor-pointer p-6"
          >
            <HiOutlineDotsVertical />
          </div>
        </div>
        <div className="grid-span-5 mx-auto">
          <div className={menuStyle} style={style}>
            <div className="flex flex-col">
              <span className="flex text-black font-semibold">
                <p className="pr-1 font-semibold">{getCurrency()}</p>
                {amount}
              </span>
              <p className="text-sm text-center">Spent</p>
            </div>
          </div>
        </div>
        <div className="grid-span-2">
          <div className="flex justify-between">
            <div className="flex flex-col p-4 items-center">
              <span className="flex text-black">
                <p className="pr-1">{getCurrency()}</p>
                {limit}
              </span>
              <p>Monthly limit</p>
            </div>
            {limit - amount >= 0 ? (
              <div className="flex flex-col p-4 items-center">
                <span className="flex text-black">
                  <p className="pr-1">
                    {limit - amount >= 0 ? getCurrency() : ""}
                  </p>
                  {limit - amount >= 0 ? limit - amount : "Limit reached"}
                </span>
                <p>Remaining</p>
              </div>
            ) : (
              <p className="font-semibold p-6 text-[#df6c4f]">Limit reached</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;

// <div className="flex justify-between text-black bg-white shadow-md rounded-xl px-4 py-6">
//   <div className="flex flex-col w-full" onClick={addBudgetOpenModal}>
//     <div className="grid grid-cols-3 justify-between pb-4">
//       <div className="col-span-1 flex flex-col justify-between">
//         <div>
//           <h1 className="uppercase font-bold text-sm md:text-base">
//             {name}
//           </h1>
//           <p className="pt-2 text-xs md:text-sm mb-10px text-gray-500">
//             {category?.name}
//           </p>
//         </div>
//         <p className="">Limit: {limit}</p>
//       </div>
//       <div className="col-span-2 mx-auto">
//         <div className={menuStyle} style={style}>
//           {Math.round((amount / limit) * 100)} %
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
