import { OverviewCard } from "./OverviewCard";

export const OverviewBox = () => {
  return (
    <div className="w-full min-w-full flex bg-primary h-32 rounded-box font-extrabold">
      <OverviewCard
        className="border-r-2 border-gray-700"
        title="TOTAL INCOME"
        amount={500}
      />
      <OverviewCard
        className="border-r-2 border-gray-700"
        title="EXPENSES"
        amount={499}
      />
      <OverviewCard title="INCOME" amount={498} />
    </div>
  );
};
