import { useRoutes } from "react-router-dom";

import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { Login } from "../features/auth/routes/Login";
import { useAuthStore } from "../stores/auth";

export const AppRoutes = () => {
  const commonRoutes = [{ path: "/", element: <Login /> }];

  // const authUser = useUser();
  const isAuth = useAuthStore((state) => state.useAuth());

  const routes = isAuth ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  // if (authUser.isLoading) {
  //   return (
  //     <div className="w-full h-48 flex justify-center items-center">
  //       <Spinner size="sm" />
  //     </div>
  //   );
  // }

  return <>{element}</>;
};
