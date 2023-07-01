import { TRANSACTION_KEYS } from "./../../transactions/api/getTransactions";
import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";

import { TotalAmountDTO, UpdateTotalAmountDTO } from "../type";

export const updateTotalAmount = ({
  data,
  id,
}: UpdateTotalAmountDTO): Promise<TotalAmountDTO> => {
  return axios.patch(`/total-amount/update/${id}`, data);
};

type UseCreateTotalAmountOptions = {
  config?: MutationConfig<typeof updateTotalAmount>;
};

export const useUpdateTotalAmount = ({
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
    mutationFn: updateTotalAmount,
  });
};
