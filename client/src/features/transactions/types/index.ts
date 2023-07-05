import { Category } from "../../categories/types";

export type Transaction = {
  id?: string;
  name: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  date: string;
  category: Category;
};

export type TransactionType = {
  _id: string;
  name: string;
};

export type CreateTransactionDTO = {
  data: {
    name: string;
    amount: number;
    type: "EXPENSE" | "INCOME";
    date: Date;
    category: string;
  };
};

export type EditTransactionDTO = {
  name: string;
  amount: number;
  type: "EXPENSE" | "INCOME";
  date: Date;
  category: string;
};

export type UpdateTransactionDTO = {
  id: string | undefined;
  transaction: EditTransactionDTO;
};

export type TransactionTableProps = {
  className?: string;
};

export type AddTransactionsValues = {
  id?: string | undefined;
  name: string;
  amount: number;
  category: Category;
  date: string;
};
export type ExistingTransactionDTO = {
  id?: string | undefined;
  name: string;
  amount: number;
  category: Category;
  date: string;
  type: "INCOME" | "EXPENSE";
};

export type TransactionDateDTO = {
  startDateYear: number | undefined;
  startDateMonth: number | undefined;
  startDateDay: number | undefined;
  endDateYear: number | undefined;
  endDateMonth: number | undefined;
  endDateDay: number | undefined;
};

export type ChartDataDTO = {
  _id: Date;
  totalAmount: number;
};
