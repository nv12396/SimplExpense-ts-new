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
    onMutate: async (editedTransaction) => {
      await queryClient.cancelQueries(TRANSACTION_KEYS.fetchTransactions());
      const previousTransaction = queryClient.getQueryData<Transaction>(
        TRANSACTION_KEYS.fetchTransactions()
      );

      queryClient.setQueryData(
        [TRANSACTION_KEYS.fetchTransactions(), editedTransaction.id],
        {
          ...previousTransaction,
          ...editedTransaction.transaction,
          id: editedTransaction.id,
        }
      );

      return { previousTransaction };
    },
    ...config,
    onSuccess: () =>
      queryClient.invalidateQueries(TRANSACTION_KEYS.fetchTransactions()),
    mutationFn: editTransaction,
  });
};

/// go add edit functionality to component
