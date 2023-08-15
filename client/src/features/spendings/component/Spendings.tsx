import { useGetTopSpendings } from "./api/getTopSpendings";
import { Spinner } from "../../../components/Elements/Spinner/Spinner";

export const Spendings = () => {
  const { data: spendings, isLoading } = useGetTopSpendings();
  return (
    <div className="flex flex-col w-full md:w-[80%] md:max-w-[80%] container md:mx-auto mb-16 md:mb-0">
      <p className="my-4 md:text-xl text-xl font-bold text-center">
        TOP SPENDINGS
      </p>
      {isLoading && (
        <div className="w-full h-48 flex justify-center items-center">
          <Spinner size="sm" />
        </div>
      )}
      {!isLoading && (
        <div className="flex gap-6 md:h-48 justify-center mb-16 h-40">
          {(spendings ?? [])?.length > 0 && (
            <div className="basis-1/3 bg-[#49c5b6] text-white flex justify-start rounded-md flex-col gap-4 pl-3 md:pl-4 shadow-md text-sm md:text-xl">
              <p className="font-bold mt-4">
                {(spendings ?? [])[0]?.category?.name || "cat"}
              </p>
              <p className="font-bold ">{(spendings ?? [])[0]?.total || 0}</p>
              <div className="w-6">
                <i className={(spendings ?? [])[0]?.category.icon}></i>
              </div>
            </div>
          )}
          {(spendings ?? [])?.length > 1 && (
            <div className="basis-1/3 bg-[#DF6C4F] text-white flex justify-start rounded-md flex-col gap-4 pl-3 md:pl-4 shadow-md text-base md:text-xl">
              <p className="font-bold mt-4">
                {(spendings ?? [])[1]?.category.name}
              </p>
              <p className="font-bold">{(spendings ?? [])[1]?.total}</p>
              <div className="w-6">
                <i className={(spendings ?? [])[1]?.category.icon}></i>
              </div>
            </div>
          )}
          {(spendings ?? [])?.length > 2 && (
            <div className="basis-1/3 bg-[#9F9FD4] text-white flex justify-start rounded-md flex-col gap-4 pl-3 md:pl-4 shadow-md text-base md:text-xl">
              <p className="font-bold mt-4">
                {(spendings ?? [])[2]?.category.name}
              </p>
              <p className="font-bold">{(spendings ?? [])[2]?.total}</p>
              <div className="w-6">
                <i className={(spendings ?? [])[2]?.category.icon}></i>
              </div>
            </div>
          )}
          {(spendings ?? [])?.length === 0 && (
            <p className="text-lg text-gray-500 mt-10">
              Please add some transactions to check out top spendings
            </p>
          )}
        </div>
      )}
    </div>
  );
};
