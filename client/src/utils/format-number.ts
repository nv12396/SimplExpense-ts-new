export const formatNumber = (number: number | undefined) => {
  if (!number) {
    return null;
  }
  return number.toLocaleString("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
