import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";
import { BUDGET_KEYS } from "./getBudget";
import { BudgetDTO } from "../type";

const deleteBudget = ({
  budgetId,
}: {
  budgetId: string | undefined;
}): Promise<BudgetDTO> => {
  return axios.delete(`budget/delete/${budgetId}`);
};

type UseDeleteBudgetOptions = {
  config?: MutationConfig<typeof deleteBudget>;
};

export const useDeleteBudget = ({ config }: UseDeleteBudgetOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(BUDGET_KEYS.fetchBudget());
    },
    ...config,
    mutationFn: deleteBudget,
  });
};
