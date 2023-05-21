import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { MainLayout } from "../components/Layout/MainLayout";
import { Dashboard } from "../features/misc/routes/Dashboard";
import { Proba } from "../features/misc/routes/Proba";

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            {/* <Spinner size="xl" /> */}
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/proba",
        element: <Proba />,
      },
    ],
  },
];
