import ContentLayout from "../../../components/Layout/ContentLayout";
import { TransactionTable } from "../../transactions/components/TransactionTable";
import { TransactionChart } from "../../charts/TransactionChart";
import { Spendings } from "../../spendings/component/Spendings";

export const Dashboard = () => {
  return (
    <ContentLayout title="SimpleExpense - Dashboard">
      <div className="flex flex-col lg:flex-row lg:justify md:items-center ">
        <div className="basis-1/2 md:mt-0 bg-[#f5f7fd] rounded-[1.4em] relative -top-[20px] px-2">
          <TransactionTable />
        </div>
        <div className="basis-1/2 px-2 flex mt-12 flex-col md:flex-row lg:flex-col md:gap-4 md:mt-4 lg:gap-12 lg:mt-16 lg:min-h-[60vh] lg:h-[60vh]">
          <TransactionChart />
          <div className="basis-1/2 px-2">
            <Spendings />
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};
