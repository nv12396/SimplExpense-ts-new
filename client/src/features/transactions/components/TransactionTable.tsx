import { useState } from "react";
import { FunnelIcon } from "@heroicons/react/24/outline";
// import { MdPlaylistAdd } from "react-icons/md";
import clsx from "clsx";

import { AddTransactionModal } from "../modals/AddTransactionModal";
import { useGetTransactions } from "../api/getTransactions";

import { Transaction, TransactionTableProps } from "../types";
import { Spinner } from "../../../components/Elements/Spinner/Spinner";
import { TransactionsCard } from "./TransactionCard";
import Button from "../../../components/ui/Button";

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

  const { data: transactions, isLoading } = useGetTransactions({
    sortBy: sort,
  });

  return (
    <div className="flex items-center justify-center">
      <div className="min-w-full w-full flex flex-col md:h-[60vh] md:min-h-[60vh]">
        <div className="flex justify-between">
          <div className="flex gap-2 cursor-pointer items-center justify-center">
            {transactions?.length && (
              <div className="dropdown">
                <label
                  tabIndex={0}
                  className="btn m-1 bg-[#f5f7fd] flex w-[120px] justify-start border-none gap-2 hover:bg-[#f5f7fd]"
                >
                  <div className="w-5 text-primaryGreen">
                    <FunnelIcon />
                  </div>

                  <p className="text-sm md:text-base text-gray-500">FILTERS</p>
                </label>
                <ul className="p-2 shadow-xl menu dropdown-content bg-white rounded-box w-72 text-primaryGreen text-sm md:text-base">
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
          <div className="items-center justify-center mt-6 hidden md:flex mb-2">
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
        <div
          className={clsx(
            "md:min-h-[44vh] md:h-[44vh] md:max-h-[44vh] min-h-[340] h-[340px] max-h-[340px] overflow-y-scroll mt-4 gap-4 flex flex-col items-center container mx-auto md:items-stretch",
            className
          )}
        >
          {!transactions?.length && !isLoading && (
            <div className="flex flex-col justify-center items-center">
              <p className="text-xl text-center mt-20 mb-8 text-gray-500">
                Please add some transactions
              </p>
            </div>
          )}
          {isLoading && (
            <div className="w-full h-48 flex justify-center items-center">
              <Spinner size="sm" />
            </div>
          )}
          {!isLoading &&
            transactions?.map((transaction: Transaction) => (
              <div
                onClick={() => setTransactionToEdit(transaction)}
                key={transaction.id}
              >
                <TransactionsCard
                  name={transaction.name}
                  amount={transaction.amount}
                  category={transaction?.category?.name}
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
      </div>
    </div>
  );
};
