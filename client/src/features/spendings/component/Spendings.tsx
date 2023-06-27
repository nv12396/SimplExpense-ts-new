import { HomeIcon } from "@heroicons/react/24/outline";

export const Spendings = () => {
  return (
    <div className="flex flex-col w-full md:w-[80%] md:max-w-[80%] container md:mx-auto mb-16 md:mb-0">
      <p className="text-start my-4 md:text-xl text-xl font-bold">
        TOP SPENDINGS
      </p>
      <div className="flex gap-6 md:h-48 justify-center mb-16 h-40">
        <div className="basis-1/3 bg-[#1f2124] text-white flex justify-start rounded-md flex-col gap-4 pl-4 shadow-md text-base md:text-xl">
          <p className="font-bold mt-4">Housing</p>
          <p className="font-bold ">$ 4000</p>
          <div className="w-6">
            <HomeIcon />
          </div>
        </div>
        <div className="basis-1/3 bg-blue-400 text-white flex justify-start rounded-md flex-col gap-4 pl-4 shadow-md text-base md:text-xl">
          <p className="font-bold mt-4">Housing</p>
          <p className="font-bold">$ 4000</p>
          <div className="w-6">
            <HomeIcon />
          </div>
        </div>
        <div className="basis-1/3 bg-[#54ca9f] text-white flex justify-start rounded-md flex-col gap-4 pl-4 shadow-md text-base md:text-xl">
          <p className="font-bold mt-4">Housing</p>
          <p className="font-bold">$ 4000</p>
          <div className="w-6">
            <HomeIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
