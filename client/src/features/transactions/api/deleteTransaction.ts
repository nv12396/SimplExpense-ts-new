import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";
import { TRANSACTION_KEYS } from "./getTransactions";

import { Transaction } from "./../types/index";

const deleteTransaction = ({
  transactionId,
  amount,
  categoryId,
  type,
}: {
  transactionId: string | undefined;
  amount: number;
  categoryId: string;
  type: "INCOME" | "EXPENSE";
}) => {
  return axios.delete(
    `transactions/delete/${transactionId}/${amount}/${type}/${categoryId}`
  );
};

type UseDeleteTransactionOptions = {
  config?: MutationConfig<typeof deleteTransaction>;
};

export const useDeleteTransaction = ({
  config,
}: UseDeleteTransactionOptions = {}) => {
  return useMutation({
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries([
        TRANSACTION_KEYS.fetchTransactions(),
        TRANSACTION_KEYS.sortBy(),
      ]);
    },
    mutationFn: deleteTransaction,
  });
};
