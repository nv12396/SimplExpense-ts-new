import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
// import { MdPlaylistAdd } from "react-icons/md";
import clsx from "clsx";

import { TransactionsCard } from "./TransactionsCard";
import { AddTransactionModal } from "../modals/AddTransactionModal";
import { useGetTransactions } from "../api/getTransactions";

import { Transaction, TransactionTableProps } from "../types";

export const TransactionTable = ({ className }: TransactionTableProps) => {
  const [sort, setSort] = useState("newest");
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

  const { data: transactions } = useGetTransactions({
    sortBy: sort,
  });

  return (
    <div className="flex items-center justify-center mt-16 md:mt-12">
      <div className="min-w-full w-full flex flex-col md:mt-8 md:h-[60vh] md:min-h-[60vh]">
        <div className="flex justify-between">
          <div className="flex gap-2 cursor-pointer items-center justify-center">
            {(transactions ?? [])?.length > 0 && (
              <div className="dropdown">
                <label
                  tabIndex={0}
                  className="btn m-1 bg-[#f7f7f7] flex w-[120px] justify-start border-none gap-2 hover:bg-[#f7f7f7]"
                >
                  <div className="w-5 text-blue-400">
                    <FunnelIcon />
                  </div>

                  <p className="text-sm md:text-base text-gray-500">FILTERS</p>
                </label>
                <ul className="p-2 shadow-xl menu dropdown-content bg-white rounded-box w-52 text-blue-400 text-sm md:text-base">
                  <li>
                    <button
                      className="text-start"
                      onClick={() => {
                        setSort("lowestAmount");
                      }}
                    >
                      <p>Amount Lowest to Highest</p>
                    </button>
                  </li>
                  <li>
                    <button
                      className="text-start"
                      onClick={() => {
                        setSort("highestAmount");
                      }}
                    >
                      Amount Highest to Lowest
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSort("oldest");
                      }}
                    >
                      Oldest
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setSort("newest");
                      }}
                    >
                      Newest
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div
          className={clsx(
            "md:min-h-[50vh] md:h-[50vh] md:max-h-[50vh] min-h-[340] h-[340px] max-h-[340px] overflow-y-scroll mt-4 gap-4 flex flex-col items-center container mx-auto md:items-stretch",
            className
          )}
        >
          {(transactions ?? [])?.length === 0 && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl text-center mt-20 mb-8 text-gray-500">
                Please add some transactions
              </p>
              {/* <MdPlaylistAdd size={40} /> */}
            </div>
          )}
          {transactions?.map((transaction: Transaction) => (
            <div onClick={() => setTransactionToEdit(transaction)}>
              <TransactionsCard
                key={transaction.id}
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
        <div className="items-center justify-center mt-6 hidden md:flex">
          <div
            onClick={() => {
              setTransactionToEdit(null);
              AddTransactionModalIsOpen();
            }}
            className="btn w-28 border-blue-400 text-blue-400 hover:bg-[#eff6ff] hover:border-blue-400 bg-white"
          >
            + ADD
          </div>
        </div>
      </div>
    </div>
  );
};
