import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Landing } from "../features/misc/routes/Landing";
import { useAuthStore } from "../stores/auth";
import { useValidateUser } from "../features/auth/api/validateUser";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Landing /> }];

  // const { data: isAuth } = useValidateUser();

  const isAuth = useAuthStore((state) => state.useAuth());
  // console.log("data", isAuth);

  const routes = isAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
