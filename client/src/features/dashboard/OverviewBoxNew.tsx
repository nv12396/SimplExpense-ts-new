import { useState } from "react";

import { OverviewCardDemo } from "./OverviewCardDemo";
import { useGetTotalAmount } from "../totalAmount/api/getTotalAmount";
import { AddTotalAmount } from "../totalAmount/components/AddTotalAmount";
import { useAddTotalAmountModal } from "../../stores/totalAmountModal";
import { useGetExpenses } from "../transactions/api/getExpenses";
import { useGetIncome } from "../transactions/api/getIncome";

import { TotalAmountDTO } from "../totalAmount/type";
import { OverviewBoxDemo } from "./OverviewBoxDemo";
import { OverviewBox } from "./OverviewBox";

export const OverviewBoxNew = () => {
  const [totalAmountToEdit, setTotalAmountToEdit] = useState<
    TotalAmountDTO | undefined
  >(null);

  //   const {
  //     addTotalAmountModalIsOpen,
  //     addTotalAmountCloseModal,
  //     addTotalAmountOpenModal,
  //   } = useAddTotalAmountModal();

  const { data: totalAmount } = useGetTotalAmount({});

  const { data: totalIncome } = useGetIncome();

  const { data: totalExpenses } = useGetExpenses();

  const month = new Date().toLocaleString("default", { month: "long" });
  return (
    <div
      className="flex h-36 w-full items-center justify-center container mx-auto relative"
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/15848982/pexels-photo-15848982/free-photo-of-a-green-background.jpeg?auto=compress&cs=tinysrgb&w=1600")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="-bottom-[45px] absolute">
        <OverviewBoxDemo
          totalAmount={totalAmount?.amount}
          income={totalIncome}
          expenses={totalExpenses}
          date={month}
        />
      </div>
    </div>
  );
};
