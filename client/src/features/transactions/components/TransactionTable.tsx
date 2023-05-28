import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";

import { TransactionsCard } from "./TransactionsCard";
import { AddTransactionModal } from "../modals/AddTransactionModal";
import { useGetTransactions } from "../api/getTransactions";
import { Transaction } from "../types";

export const TransactionTable = () => {
  const [addTransactionModalIsOpen, setAddTransactionModalIsOpen] =
    useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  const AddTransactionModalIsOpen = () => {
    setAddTransactionModalIsOpen(true);
  };

  const AddTransactionCloseModal = () => {
    setAddTransactionModalIsOpen(false);
  };

  const { data: transactions } = useGetTransactions();

  console.log("transactionsss are", transactions);

  return (
    <div className="flex items-center justify-center">
      <div className="min-w-full w-full flex flex-col mt-8">
        <div className="flex justify-between">
          <div className="flex gap-2 cursor-pointer items-center justify-center">
            <div className="w-4 text-secondaryGreen">
              <FunnelIcon />
            </div>
            <p className="text-base text-gray-500">FILTERS</p>
          </div>
          <div
            onClick={() => {
              setTransactionToEdit(null);
              AddTransactionModalIsOpen();
            }}
            className="btn w-32 min-w-32 bg-secondaryGreen text-black hover:bg-primaryGreen"
          >
            + ADD
          </div>
        </div>
        <div className="min-h-64 h-64 max-h-64 overflow-y-scroll mt-4 3xl:h-72 3xl:min-h-72 3xl:max-h-72">
          {transactions?.map((transaction) => (
            <div onClick={() => setTransactionToEdit(transaction)}>
              <TransactionsCard
                name={transaction.name}
                amount={transaction.amount}
                category={transaction.category.name}
                date={transaction.date}
                type={transaction.type}
                AddTransactionModalIsOpen={AddTransactionModalIsOpen}
              />
            </div>
          ))}
        </div>
        <div>
          <AddTransactionModal
            AddTransactionCloseModal={AddTransactionCloseModal}
            addTransactionModalIsOpen={addTransactionModalIsOpen}
            existingTransaction={transactionToEdit}
          />
        </div>
      </div>
    </div>
  );
};
