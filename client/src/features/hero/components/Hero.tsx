import moment from "moment";

export const Hero = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = new Date().getMonth();
  const currentDate = moment(new Date()).format("Do MMMM YYYY");
  return (
    <div className="container mx-auto px-4 flex flex-col">
      <div className="w-full min-w-full flex justify-between items-center">
        <h1 className="hidden md:block font-bold text-lg md:text-4xl text-white">
          Welcome back Nebojsa
        </h1>
        <h1 className="block md:hidden text-xl text-white font-bold px-4 py-4">
          SimplExpense
        </h1>
        <p className="text-white text-sm pt-2 md:text-lg">{currentDate}</p>
      </div>
      <h1 className="hidden md:block mt-12 text-2xl font-bold text-white">
        Overview for month {monthNames[currentMonth]}
      </h1>
    </div>
  );
};
