export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const options = {
    day: "numeric" as const,
    month: "long" as const,
    year: "numeric" as const,
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const day = date.getDate();
  let daySuffix = "th";

  // Handling the suffix for day (st, nd, rd, th)
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  return `${day}${daySuffix} ${formattedDate}`;
};
