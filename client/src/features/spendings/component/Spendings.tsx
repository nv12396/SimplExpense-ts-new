import { HomeIcon } from "@heroicons/react/24/outline";
import { useGetTopSpendings } from "./api/getTopSpendings";

export const Spendings = () => {
  const { data: spendings, isLoading } = useGetTopSpendings();
  return (
    <div className="flex flex-col w-full md:w-[80%] md:max-w-[80%] container md:mx-auto mb-16 md:mb-0">
      <p className="text-start my-4 md:text-xl text-xl font-bold">
        TOP SPENDINGS
      </p>
      {!isLoading && (
        <div className="flex gap-6 md:h-48 justify-center mb-16 h-40">
          <div className="basis-1/3 bg-[#1f2124] text-white flex justify-start rounded-md flex-col gap-4 pl-1 md:pl-4 shadow-md text-sm md:text-xl">
            <p className="font-bold mt-4">
              {spendings[0]?.category?.name || "cat"}
            </p>
            <p className="font-bold ">{spendings[0]?.total || 0}</p>
            <div className="w-6">
              <HomeIcon />
            </div>
          </div>
          <div className="basis-1/3 bg-blue-400 text-white flex justify-start rounded-md flex-col gap-4 pl-1 md:pl-4 shadow-md text-base md:text-xl">
            <p className="font-bold mt-4">{spendings[1]?.category.name}</p>
            <p className="font-bold">{spendings[1]?.total}</p>
            <div className="w-6">
              <HomeIcon />
            </div>
          </div>
          <div className="basis-1/3 bg-[#54ca9f] text-white flex justify-start rounded-md flex-col gap-4 pl-1 md:pl-4 shadow-md text-base md:text-xl">
            <p className="font-bold mt-4">{spendings[2]?.category.name}</p>
            <p className="font-bold">{spendings[2]?.total}</p>
            <div className="w-6">
              <HomeIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
