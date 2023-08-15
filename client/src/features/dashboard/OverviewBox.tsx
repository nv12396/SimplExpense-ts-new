import { useState } from "react";

import { OverviewCardDemo } from "./OverviewCardDemo";
import { useGetTotalAmount } from "../totalAmount/api/getTotalAmount";
import { AddTotalAmount } from "../totalAmount/components/AddTotalAmount";
import { useAddTotalAmountModal } from "../../stores/totalAmountModal";
import { useGetExpenses } from "../transactions/api/getExpenses";
import { useGetIncome } from "../transactions/api/getIncome";

import { TotalAmountDTO } from "../totalAmount/type";

export const OverviewBox = () => {
  const [totalAmountToEdit, setTotalAmountToEdit] = useState<
    TotalAmountDTO | undefined
  >(null);

  const {
    addTotalAmountModalIsOpen,
    addTotalAmountCloseModal,
    addTotalAmountOpenModal,
  } = useAddTotalAmountModal();

  const { data: totalAmount } = useGetTotalAmount({});

  const { data: totalIncome } = useGetIncome();

  const { data: totalExpenses } = useGetExpenses();

  const month = new Date().toLocaleString("default", { month: "long" });
  return (
    <div className="md:w-full mt-4 w-[90%] flex h-48 rounded-box gap-4 md:gap-12 items-center justify-center md:justify-center container mx-auto md:px-2">
      <OverviewCardDemo
        onClick={() => {
          if (totalAmount?.amount !== 0) {
            setTotalAmountToEdit(totalAmount);
          } else {
            setTotalAmountToEdit(null);
          }
        }}
        className="hidden md:flex basis-1/4"
        title="TOTAL AMOUNT"
        amount={totalAmount?.amount || 0}
        iconClasses="bg-[#ecfdf5] text-[#54ca9f]"
        AddTotalAmountModalIsOpen={addTotalAmountOpenModal}
      />
      <OverviewCardDemo
        iconClasses="bg-[#fef2f2] text-[#f2605f]"
        title="EXPENSES"
        amount={totalExpenses || 0}
        className="basis-1/2 md:basis-1/4"
        date={`Overview for ${month}`}
      />
      <OverviewCardDemo
        title="INCOME"
        className="basis-1/2 md:basis-1/4"
        amount={totalIncome || 0}
        iconClasses="bg-[#eff6ff] text-[#4688f6]"
        date={`Overview for ${month}`}
      />

      <AddTotalAmount
        AddTotalAmountCloseModal={addTotalAmountCloseModal}
        addTotalAmountModalIsOpen={addTotalAmountModalIsOpen}
        existingTotalAmount={totalAmountToEdit!}
      />
    </div>
  );
};
