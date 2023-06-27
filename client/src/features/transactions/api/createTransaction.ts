import { TRANSACTION_KEYS } from "./getTransactions";
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
    onSuccess: () => {
      queryClient.invalidateQueries([TRANSACTION_KEYS.fetchTransactions()]);
    },
    ...config,
    mutationFn: createTransaction,
  });
};
