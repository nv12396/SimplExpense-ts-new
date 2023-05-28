import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";
import { CreateTransactionDTO, Transaction } from "../types";

export const createTransaction = ({
  data,
}: CreateTransactionDTO): Promise<Transaction> => {
  return axios.post("/transactions/create", data);
};

type UseCreateTransactionOptions = {
  config?: MutationConfig<typeof createTransaction>;
};

export const useCreateTransaction = ({
  config,
}: UseCreateTransactionOptions = {}) => {
  return useMutation({
    onMutate: async (newTransaction) => {
      await queryClient.cancelQueries(["transactions"]);

      const previousTransactions = queryClient.getQueryData<Transaction[]>([
        "transactions",
      ]);

      queryClient.setQueryData(
        ["transactions"],
        [...(previousTransactions || []), newTransaction.data]
      );

      return { previousTransactions };
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["transactions"]);
    },
    ...config,
    mutationFn: createTransaction,
  });
};
