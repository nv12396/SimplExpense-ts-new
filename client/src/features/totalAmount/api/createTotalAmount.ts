import { TRANSACTION_KEYS } from "./../../transactions/api/getTransactions";
import { useMutation } from "@tanstack/react-query";
import { CreateTotalAmountDTO, TotalAmountDTO } from "../type";
import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";

export const createTransaction = ({
  data,
}: CreateTotalAmountDTO): Promise<TotalAmountDTO> => {
  return axios.post("/total-amount/create", data);
};

type UseCreateTotalAmountOptions = {
  config?: MutationConfig<typeof createTransaction>;
};

export const useCreateTotalAmount = ({
  config,
}: UseCreateTotalAmountOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries([
        TRANSACTION_KEYS.fetchTransactions(),
        TRANSACTION_KEYS.sortBy(),
      ]);
    },
    ...config,
    mutationFn: createTransaction,
  });
};
