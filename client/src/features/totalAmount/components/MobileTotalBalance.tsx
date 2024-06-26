import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

import { useAddTotalAmountModal } from "../../../stores/totalAmountModal";
import { useGetTotalAmount } from "../api/getTotalAmount";
import { useGetExpenses } from "../../transactions/api/getExpenses";
import { useGetIncome } from "../../transactions/api/getIncome";
import { AddTotalAmount } from "./AddTotalAmount";

import { TotalAmountDTO } from "../type";
import { formatNumber } from "../../../utils/format-number";
import { getCurrency } from "../../../utils/format-currency";

export const MobileTotalBalance = () => {
  const [totalAmountToEdit, setTotalAmountToEdit] = useState<
    TotalAmountDTO | undefined
  >(null);

  const { addTotalAmountCloseModal, addTotalAmountModalIsOpen } =
    useAddTotalAmountModal();
  const { data: totalAmount } = useGetTotalAmount();
  const { data: totalExpenses } = useGetExpenses();
  const { data: totalIncome } = useGetIncome();

  return (
    // <div className="bg-gradient-to-tr from-indigo-800 via-teal-800 to-blue-400 w-full flex flex-col pt-4 h-[20vh] fixed z-50">
    <div className="bg-gradient-to-tr from-pink-800 via-teal-800 to-blue-400 w-full flex flex-col pt-4 h-[22vh] z-50">
      {/* <div className="bg-gradient-to-tr from-pink-100 via-teal-800 to-blue-400 w-full flex flex-col pt-4 h-[20vh] fixed z-50"> */}
      <p className="text-md font-bold text-gray-300 text-center mb-2">
        Total Balance
      </p>
      <div
        className="flex flex-col text-white gap-4 items-center justify-center"
        onClick={() => {
          if (totalAmount?.amount !== 0) {
            setTotalAmountToEdit(totalAmount);
          } else {
            setTotalAmountToEdit(null);
          }
        }}
      >
        <div className="flex gap-2">
          <div className="flex">
            <p className="text-white text-2xl pr-1">{getCurrency()}</p>
            <p className="text-white text-3xl font-bold text-center">
              {formatNumber(totalAmount?.amount) || 0}
            </p>
          </div>
          <div
            className="w-4 mt-1 cursor-pointer text-white"
            onClick={() => {
              if (totalAmount?.amount !== 0) {
                setTotalAmountToEdit(totalAmount);
              } else {
                setTotalAmountToEdit(null);
              }
            }}
          >
            {totalAmount?.amount === 0 ||
              (!totalAmount && <PlusCircleIcon className="text-gray-200" />)}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-4 px-20">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm text-gray-200 font-bold">Income</p>
          <div className="flex">
            <p className="text-primaryGreen pr-1">{getCurrency()}</p>
            <p className="text-xl font-bold text-primaryGreen">
              {totalIncome || 0}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm font-bold text-gray-200">Expenses</p>
          <div className="flex">
            <p className="text-rose-400 pr-1">{getCurrency()}</p>
            <p className="text-xl font-bold text-rose-400">
              {totalExpenses || 0}
            </p>
          </div>
        </div>
      </div>
      <AddTotalAmount
        AddTotalAmountCloseModal={addTotalAmountCloseModal}
        addTotalAmountModalIsOpen={addTotalAmountModalIsOpen}
        existingTotalAmount={totalAmountToEdit}
      />
    </div>
  );
};
