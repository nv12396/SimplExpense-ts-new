import { useMutation } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { MutationConfig, queryClient } from "../../../lib/react-query";
import { UpdateSettingsDTO } from "../type";
import { SettingsDTO } from "../types";

export const updateSettings = ({
  id,
  data,
}: UpdateSettingsDTO): Promise<SettingsDTO> => {
  return axios.patch(`/user/update-settings/${id}`, data);
};

type UseupdateSettingsOptions = {
  config?: MutationConfig<typeof updateSettings>;
};

export const useUpdateSettings = ({
  config,
}: UseupdateSettingsOptions = {}) => {
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["settings, user, auth"]);
    },
    ...config,
    mutationFn: updateSettings,
  });
};
