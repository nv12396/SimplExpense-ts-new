import { useQuery } from "@tanstack/react-query";

import { axios } from "../../../lib/axios";
import { ExtractFnReturnType, QueryConfig } from "../../../lib/react-query";
import storage from "../../../utils/storage";

export const validateUser = async (): Promise<string | undefined> => {
  const date = await axios.get("/auth/validate");

  if (date) {
    return storage.getToken();
  } else {
    return;
  }
};

type QueryFnType = typeof validateUser;

type UseValidateUserOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useValidateUser = ({ config }: UseValidateUserOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ["validate"],
    queryFn: () => validateUser(),
  });
};
