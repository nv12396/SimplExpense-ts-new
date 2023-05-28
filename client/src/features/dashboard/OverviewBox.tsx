import { OverviewCard } from "./OverviewCard";

export const OverviewBox = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full min-w-full flex h-32 rounded-box font-extrabold gap-4 items-center justify-center">
        <OverviewCard className="" title="TOTAL INCOME" amount={500} />
        <OverviewCard className="" title="EXPENSES" amount={499} />
        <OverviewCard title="INCOME" amount={498} />
      </div>
    </div>
  );
};
