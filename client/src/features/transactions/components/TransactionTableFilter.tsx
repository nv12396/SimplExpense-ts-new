import { useState } from "react";
import clsx from "clsx";

import { AddTransactionModal } from "../modals/AddTransactionModal";
import { TRANSACTION_KEYS, useGetTransactions } from "../api/getTransactions";

import { Transaction, TransactionTableProps } from "../types";
import { findTransactionsWithinDateRange } from "../api/findTransactionsWithinDateRange";
import { useQuery } from "@tanstack/react-query";
import { useDateRangeStore } from "../../../stores/date-range";
import { Spinner } from "../../../components/Elements/Spinner/Spinner";
import { TransactionsCard } from "./TransactionCard";
import Button from "../../../components/ui/Button";

export const TransactionTableFilter = ({
  className,
}: TransactionTableProps) => {
  const { startDate, endDate } = useDateRangeStore();
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

  const dates = {
    startDateYear: startDate?.getFullYear(),
    startDateMonth: startDate?.getMonth(),
    startDateDay: startDate?.getDate(),
    endDateYear: endDate?.getFullYear(),
    endDateMonth: endDate?.getMonth(),
    endDateDay: endDate?.getDate(),
  };

  const { data: transactions } = useGetTransactions({
    sortBy: "newest",
  });

  const { data: filteredTransactions, isLoading } = useQuery(
    [
      TRANSACTION_KEYS.fetchTransactions(),
      TRANSACTION_KEYS.sortBy(),
      dates.startDateDay,
    ],
    () => {
      if (dates.startDateDay) {
        return findTransactionsWithinDateRange(dates);
      } else {
        return transactions;
      }
    }
  );

  return (
    <div className="flex items-center justify-center mt-8">
      <div className="min-w-full w-full flex flex-col md:mt-8">
        <div className="flex justify-between"></div>
        <div
          className={clsx(
            "overflow-y-scroll mt-4 gap-4 flex flex-col items-center container mx-auto",
            className
          )}
        >
          {!filteredTransactions?.length && !isLoading && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl text-center mt-20 mb-8 text-gray-500">
                There is no transactions in selected period.
              </p>
            </div>
          )}
          {isLoading && (
            <div className="w-full h-48 flex justify-center items-center">
              <Spinner size="sm" />
            </div>
          )}
          {!isLoading &&
            filteredTransactions?.map((transaction: Transaction) => (
              <div
                onClick={() => setTransactionToEdit(transaction)}
                key={transaction.id}
                className="w-full"
              >
                <TransactionsCard
                  name={transaction.name}
                  amount={transaction.amount}
                  category={transaction.category.name}
                  date={transaction.date}
                  type={transaction.type}
                  icon={transaction.category.icon}
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
        <div className="items-center justify-center mt-6 hidden md:flex">
          <Button
            onClick={() => {
              setTransactionToEdit(null);
              AddTransactionModalIsOpen();
            }}
            className="hidden md:flex w-24 mx-auto items-center justify-center"
          >
            + ADD
          </Button>
        </div>
      </div>
    </div>
  );
};
