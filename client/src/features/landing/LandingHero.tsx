import Button from "../../components/ui/Button";

import Dashboard from "./../../assets/dashboard.png";
import Transactions from "./../../assets/transactions.png";
import Budget from "./../../assets/budget.png";
import { useNavigate } from "react-router-dom";

const LandingHero = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      <div className="flex md:flex-row-reverse flex-col mt-12">
        <div className="text-black basis-1/2 md:-mt-24 flex flex-col gap-y-8 px-4 md:px-16 md:mb-0 mb-10 md:min-h-[85vh] items-center justify-center">
          <h1 className="text-3xl text-primaryGreen font-extrabold text-center">
            Simplify Expenses with SimplExpense
          </h1>
          <h4 className="text-xl text-center text-secondaryGreen font-semibold">
            Take Control of Your Financial Journey
          </h4>
          <p className="text-lg text-center md:text-left">
            Welcome to SimplExpense, where managing your expenses is effortless.
            With our user-friendly app, you can track your finances on-the-go.
            Say goodbye to financial stress and hello to simplicity with
            SimplExpense.
          </p>
          <Button
            onClick={() => navigate("/auth/register")}
            className="w-48 mx-auto"
          >
            Join Today!
          </Button>
        </div>
        <div className="basis-1/2 flex items-center justify-center">
          <img
            src={Dashboard}
            alt="demo"
            className="w-[90%] border border-gray shadow-xl"
          />
        </div>
      </div>
      {/* <div className="relative bg-primaryGreen mt-72 flex flex-col items-center justify-center">
        <img
          src={Collage}
          alt="demo"
          className="md:w-[70%] w-[95%] absolute left-[50%] transform translate-x-[-50%] -top-[50%] z-40"
        />
        <div className="text-center mt-32 py-24">
          <h1 className="text-3xl text-secondaryGreen font-extrabold">
            Keep track of all your transactions in one place
          </h1>
          <div className="flex md:flex-row flex-col justify-between px-24 gap-x-12 mt-12">
            <div>
              <h4 className="text-xl font-bold mb-6">
                Simplest way to track expenses
              </h4>
              <p className="text-lg max-w-md text-black md:text-left">
                No complex charts or tables cluttering your view—instead, enjoy
                a streamlined and intuitive interface for effortless expense
                tracking.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-6">
                All your Transactions in one place
              </h4>
              <p className="text-lg max-w-md text-black md:text-left">
                The transaction tab serves as your financial hub, allowing you
                to conveniently track all transactions and apply filters for
                streamlined organization.
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex md:flex-row-reverse flex-col-reverse mt-12 md:mt-24 bg-primaryGreen py-12 md:py-20">
        <div className="basis-1/2 flex items-center justify-center">
          <img
            src={Transactions}
            alt="demo"
            className="w-[90%] border-black border shadow-xl"
          />
        </div>
        <div className="text-black basis-1/2 flex flex-col gap-y-8 px-4 md:px-16 md:mb-0 mb-10 mt-0 md:mt-16">
          <h1 className="text-3xl text-secondaryGreen font-extrabold text-center">
            Keep track of all your transactions in one place
          </h1>

          <p className="text-lg text-black text-center md:text-left">
            The transaction tab serves as your financial hub, allowing you to
            conveniently track all transactions and apply filters for
            streamlined organization. Effortlessly manage your spending history,
            categorize transactions, and gain valuable insights into your
            financial activity with ease.
          </p>
        </div>
      </div>
      <div className="flex md:flex-row-reverse flex-col mt-12 md:mt-24 pb-20">
        <div className="text-black basis-1/2 flex flex-col gap-y-8 px-4 md:px-16 md:mb-0 mb-10">
          <h1 className="text-3xl text-primaryGreen font-extrabold text-center mt-0 md:mt-16">
            Monitor spendings by setting clear budget!
          </h1>
          <p className="text-lg text-center md:text-left">
            Take control of your finances with ease through our intuitive
            budgeting feature, enabling you to set clear spending limits and
            allocate budgets to various categories. Monitor your expenses
            closely and make informed decisions to achieve your financial goals
            effectively and efficiently.
          </p>
        </div>
        <div className="basis-1/2 flex items-center justify-center">
          <img
            src={Budget}
            alt="demo"
            className="w-[90%] border border-gray shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
