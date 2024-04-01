import { WalletIcon } from "@heroicons/react/24/outline";

type OverviewBoxDemoT = {
  totalAmount: number | undefined;
  expenses: number | undefined;
  income: number | undefined;
  className?: string;
  onClick?: () => void;
  AddTotalAmountModalIsOpen?: () => void;
  date?: string;
};

export const OverviewBoxDemo = ({
  totalAmount,
  expenses,
  income,
  date,
}: OverviewBoxDemoT) => {
  return (
    <div className="stats shadow-xl bg-[#f5f7fd]">
      <div className="stat">
        <div className="stat-figure text-primary">
          <div className="w-7 rounded-md text-green-700">
            <WalletIcon />
          </div>
        </div>
        <div className="stat-title text-black">Total Amount</div>
        <div className="stat-value text-primary -mt-2">
          {totalAmount || 0} $
        </div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="w-7 rounded-md text-rose-400">
            <WalletIcon />
          </div>
        </div>
        <div className="stat-title text-black">Expenses</div>
        <div className="stat-value text-secondary">{expenses || 0} $</div>
        <div className="stat-desc text-gray-500">
          {`Total Expenses for ${date}`}
        </div>
      </div>
      <div className="stat">
        <div className="stat-figure text-secondary text-blue-400">
          <div className="w-7 rounded-md text-blue-400">
            <WalletIcon />
          </div>
        </div>
        <div className="stat-title text-black">Income</div>
        <div className="stat-value text-secondary">{income || 0} $</div>
        <div className="stat-desc text-gray-500">
          {" "}
          {`Total Expenses for ${date}`}
        </div>
      </div>

      {/* <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>
        <div className="stat-value">86%</div>
        <div className="stat-title">Tasks done</div>
        <div className="stat-desc text-secondary">31 tasks remaining</div>
      </div> */}
    </div>
  );
};
