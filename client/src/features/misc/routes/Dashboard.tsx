import ContentLayout from "../../../components/Layout/ContentLayout";
import { TransactionTable } from "../../transactions/components/TransactionTable";
import { TransactionChart } from "../../charts/TransactionChart";
import { Spendings } from "../../spendings/component/Spendings";

export const Dashboard = () => {
  return (
    <ContentLayout title="SimpleExpense - Dashboard">
      <div className="container mx-auto px-2">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col md:flex-row md:justify-around md:items-center">
            <div className="basis-1/2">
              <TransactionTable />
            </div>
            <div className="basis-1/2 flex flex-col gap-12 mt-16 lg:mt-24">
              <div className="basis-1/2">
                <TransactionChart />
              </div>
              <div className="basis-1/2">
                <Spendings />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
