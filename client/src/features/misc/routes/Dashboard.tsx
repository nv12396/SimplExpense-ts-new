import ContentLayout from "../../../components/Layout/ContentLayout";
import { OverviewBox } from "../../dashboard/OverviewBox";
import { TransactionTable } from "../../transactions/components/TransactionTable";
import { TransactionChart } from "../../charts/TransactionChart";

export const Dashboard = () => {
  return (
    <div className="text-gray-200 text-xl m-4">
      <ContentLayout title="SimpleExpense - Dashboard">
        <p className="mb-4">Overview</p>
        <OverviewBox />
        <TransactionChart />
        <TransactionTable />
      </ContentLayout>
    </div>
  );
};
