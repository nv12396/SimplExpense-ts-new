import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Landing } from "../features/misc/routes/Landing";
import { useAuthStore } from "../stores/auth";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Landing /> }];

  const isAuth = useAuthStore((state) => state.useAuth());

  const routes = isAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
