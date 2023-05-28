import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";
import { TRANSACTION_KEYS } from "./getTransactions";

import { Transaction } from "./../types/index";

const deleteTransaction = ({
  transactionId,
}: {
  transactionId: string | undefined;
}) => {
  return axios.delete(`transactions/delete/${transactionId}`);
};

type UseDeleteTransactionOptions = {
  config?: MutationConfig<typeof deleteTransaction>;
};

export const useDeleteTransaction = ({
  config,
}: UseDeleteTransactionOptions = {}) => {
  return useMutation({
    onMutate: async (deletedTransaction) => {
      await queryClient.cancelQueries(TRANSACTION_KEYS.fetchTransactions());

      const previousTransactions = queryClient.getQueryData<Transaction[]>(
        TRANSACTION_KEYS.fetchTransactions()
      );

      queryClient.setQueryData(
        TRANSACTION_KEYS.fetchTransactions(),
        previousTransactions?.filter(
          (transaction) => transaction.id !== deletedTransaction.transactionId
        )
      );

      return { previousTransactions };
    },
    ...config,
    onSuccess: () => {
      queryClient.invalidateQueries(TRANSACTION_KEYS.fetchTransactions());
    },
    mutationFn: deleteTransaction,
  });
};
