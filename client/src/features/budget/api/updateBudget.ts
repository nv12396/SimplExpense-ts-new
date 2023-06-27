import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";
import { BUDGET_KEYS } from "./getBudget";

import { BudgetDTO, UpdateBudgetDTO } from "../type";

export const updateBudget = ({
  id,
  data,
}: UpdateBudgetDTO): Promise<BudgetDTO> => {
  return axios.patch(`/budget/update/${id}`, data);
};

type UseUpdateBudgetOptions = {
  config?: MutationConfig<typeof updateBudget>;
};

export const useUpdateBudget = ({ config }: UseUpdateBudgetOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(BUDGET_KEYS.fetchBudget());
    },
    ...config,
    mutationFn: updateBudget,
  });
};
