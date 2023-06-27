import { useMutation } from "@tanstack/react-query";
import { MutationConfig, queryClient } from "./../../../lib/react-query";
import { Transaction, UpdateTransactionDTO } from "./../types/index";
import { axios } from "../../../lib/axios";
import { TRANSACTION_KEYS } from "./getTransactions";

const editTransaction = ({
  id,
  transaction,
}: UpdateTransactionDTO): Promise<Transaction> => {
  return axios.patch(`transactions/update/${id}`, transaction);
};

type UseEditTransactionOptions = {
  config?: MutationConfig<typeof editTransaction>;
};

export const UseEditTransaction = ({
  config,
}: UseEditTransactionOptions = {}) => {
  return useMutation({
    ...config,
    onSuccess: () =>
      queryClient.invalidateQueries([
        TRANSACTION_KEYS.fetchTransactions(),
        TRANSACTION_KEYS.sortBy(),
      ]),
    mutationFn: editTransaction,
  });
};
