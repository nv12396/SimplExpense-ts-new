import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

import { TransactionsCard } from "./TransactionsCard";
import { transactions } from "../../../mockData";
import { AddTransactionModal } from "../modals/AddTransactionModal";

export const TransactionTable = () => {
  const [addTransactionModalIsOpen, setAddTransactionModalIsOpen] =
    useState(false);

  const AddTransactionModalIsOpen = () => {
    setAddTransactionModalIsOpen(true);
  };

  const AddTransactionCloseModal = () => {
    setAddTransactionModalIsOpen(false);
  };

  return (
    <div className="min-w-full w-full flex flex-col mt-8">
      <div className="flex justify-between">
        <div className="flex gap-2 cursor-pointer items-center justify-center">
          <div className="w-4 text-secondaryGreen">
            <FunnelIcon />
          </div>
          <p className="text-base text-gray-500">FILTERS</p>
        </div>
        <div
          onClick={AddTransactionModalIsOpen}
          className="btn w-32 min-w-32 bg-secondaryGreen text-black hover:bg-primaryGreen"
        >
          + ADD
        </div>
      </div>
      <div className="min-h-60 h-60 max-h-60 overflow-y-scroll mt-4">
        {transactions?.map((transaction) => (
          <TransactionsCard
            name={transaction.name}
            amount={transaction.amount}
            description={transaction.description}
            date={transaction.date}
            type={transaction.type}
          />
        ))}
      </div>
      <AddTransactionModal
        AddTransactionCloseModal={AddTransactionCloseModal}
        addTransactionModalIsOpen={addTransactionModalIsOpen}
      />
    </div>
  );
};
