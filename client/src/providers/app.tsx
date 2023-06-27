import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { queryClient } from "../lib/react-query";

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          toastStyle={{ backgroundColor: "#272638", color: "white" }}
        />
        <Router>{children}</Router>
      </QueryClientProvider>
    </HelmetProvider>
  );
};
