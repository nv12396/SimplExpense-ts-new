import clsx from "clsx";
import { AiOutlineWallet } from "react-icons/ai";

type OverviewCardPropsType = {
  title: string;
  amount: number;
  className?: string;
};

export const OverviewCard = ({
  title,
  amount,
  className,
}: OverviewCardPropsType) => {
  return (
    <div
      className={clsx(
        "flex flex-col p-4 basis-1/5 ml-8 items-center my-2 bg-primary gap-4 rounded-md",
        className
      )}
    >
      <h1 className="text-secondaryGreen text-base pb-2 font-extrabold text-start">
        {title}
      </h1>
      <div className="flex flex-start items-start justify-start">
        <p className="text-secondaryGreen mr-4 font-extrabold text-4xl text-start">
          $
        </p>
        <p className="font-extrabold text-4xl">{amount}</p>
      </div>
    </div>
  );
};
