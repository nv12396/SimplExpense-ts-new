import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";
import { BudgetDTO, CreateBudgetDTO } from "../type";
import { BUDGET_KEYS } from "./getBudget";

export const createBudget = ({ data }: CreateBudgetDTO): Promise<BudgetDTO> => {
  return axios.post("/budget/create", data);
};

type UseCreateBudgetOptions = {
  config?: MutationConfig<typeof createBudget>;
};

export const useCreateBudget = ({ config }: UseCreateBudgetOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(BUDGET_KEYS.fetchBudget());
    },
    ...config,
    mutationFn: createBudget,
  });
};
