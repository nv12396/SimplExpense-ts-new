import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useAuthStore } from "../stores/auth";
import { Login } from "../features/auth/routes/Login";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Login /> }];

  const isAuth = useAuthStore((state) => state.useAuth());

  const routes = isAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
