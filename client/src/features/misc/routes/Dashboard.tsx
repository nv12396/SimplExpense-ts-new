import ContentLayout from "../../../components/Layout/ContentLayout";
import { OverviewBox } from "../../dashboard/OverviewBox";
import { TransactionTable } from "../../transactions/components/TransactionTable";
import { TransactionChart } from "../../charts/TransactionChart";

export const Dashboard = () => {
  return (
    <div className="text-gray-200 text-xl m-4">
      <ContentLayout title="SimpleExpense - Dashboard">
        <div className="flex flex-col min-h-full h-[90vh] justify-between">
          <p className="mb-4">Overview</p>

          <div className="basis-1/3">
            <OverviewBox />
          </div>
          <div className="flex flex-col md:flex-row justify-around items-center">
            <div className="basis-1/2">
              <TransactionTable />
            </div>
            <div className="basis-1/2">
              <TransactionChart />
            </div>
          </div>
        </div>
      </ContentLayout>
    </div>
  );
};
