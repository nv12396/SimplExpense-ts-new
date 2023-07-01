import { useState } from "react";

import { OverviewCard } from "./OverviewCard";
import { useGetTotalAmount } from "../totalAmount/api/getTotalAmount";
import { AddTotalAmount } from "../totalAmount/components/AddTotalAmount";
import { useAddTotalAmountModal } from "../../stores/totalAmountModal";
import { useGetExpenses } from "../transactions/api/getExpenses";
import { useGetIncome } from "../transactions/api/getIncome";

import { TotalAmountDTO } from "../totalAmount/type";

export const OverviewBox = () => {
  const [totalAmountToEdit, setTotalAmountToEdit] =
    useState<TotalAmountDTO | null>(null);

  const {
    addTotalAmountModalIsOpen,
    addTotalAmountCloseModal,
    addTotalAmountOpenModal,
  } = useAddTotalAmountModal();

  const { data: totalAmount } = useGetTotalAmount({});

  const { data: totalIncome } = useGetIncome();
  const { data: totalExpenses } = useGetExpenses();

  return (
    <div className="md:w-full w-[90%] flex h-32 rounded-box font-extrabold gap-4 md:gap-12 items-center justify-center md:justify-center absolute top-[-60px] container mx-auto md:px-2">
      <OverviewCard
        onClick={() => {
          if (totalAmount?.amount !== 0) {
            setTotalAmountToEdit(totalAmount!);
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
      <OverviewCard
        iconClasses="bg-[#fef2f2] text-[#f2605f]"
        title="EXPENSES"
        amount={totalExpenses || 0}
        className="basis-1/2 md:basis-1/4"
      />
      <OverviewCard
        title="INCOME"
        className="basis-1/2 md:basis-1/4"
        amount={totalIncome || 0}
        iconClasses="bg-[#eff6ff] text-[#4688f6]"
      />
      <OverviewCard
        title="SAVINGS"
        className="hidden md:flex basis-1/4"
        amount={498}
        iconClasses="bg-[#eff6ff] text-[#4688f6]"
      />
      {/* <OverviewCard title="INCOME" amount={498} /> */}
      <AddTotalAmount
        AddTotalAmountCloseModal={addTotalAmountCloseModal}
        addTotalAmountModalIsOpen={addTotalAmountModalIsOpen}
        existingTotalAmount={totalAmountToEdit!}
      />
    </div>
  );
};
