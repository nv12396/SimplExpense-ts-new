import storage from "./storage";

export const formatCurrency = (currency: string) => {
  switch (currency) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
  }
};

export const getCurrency = () => {
  return formatCurrency(storage.getUser().currency);
};
