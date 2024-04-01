import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useAuthStore } from "../stores/auth";
import LandingPage from "../features/landing/LandingPage";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <LandingPage /> }];

  const isAuth = useAuthStore((state) => state.useAuth());

  const routes = isAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
