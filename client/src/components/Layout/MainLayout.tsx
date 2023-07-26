import { PencilSquareIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { Hero } from "../../features/hero/components/Hero";
import { useGetTotalAmount } from "../../features/totalAmount/api/getTotalAmount";
import { useAddTotalAmountModal } from "../../stores/totalAmountModal";
import { MobileNavbar } from "../Navbar/MobileNavbar";
import { Navbar } from "../Navbar/Navbar";
import { useState } from "react";
import { TotalAmountDTO } from "../../features/totalAmount/type";
import { AddTotalAmount } from "../../features/totalAmount/components/AddTotalAmount";
import { Sidebar } from "../Navbar/Sidebar";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="grid grid-cols-6 bg-white min-h-screen md:h-screen">
      <div className="col-span-1 hidden md:block">
        <Sidebar />
      </div>
      <div className="md:col-span-5 col-span-6 bg-[#f5f7fd]">{children}</div>
      <MobileNavbar />
    </div>
  );
};
// export const MainLayout = ({ children }: MainLayoutProps) => {
//   return (
//     <div className="flex min-h-screen bg-white md:h-screen flex-col">
//       <div className="min-h-[25vh] h-[25vh] w-full min-w-full bg-[#1f2124]">
//         <Navbar />
//         <Hero />
//         <div className="md:hidden block">
//           <MobileTotalBalance />
//         </div>
//       </div>
//       <div className="h-full md:min-h-[75vh] md:h-[70vh] w-full bg-[#f7f7f7] relative min-w-full">
//         {children}
//       </div>
//       <MobileNavbar />
//     </div>
//   );
// };

const MobileTotalBalance = () => {
  const [totalAmountToEdit, setTotalAmountToEdit] = useState<
    TotalAmountDTO | undefined
  >(null);

  const {
    addTotalAmountOpenModal,
    addTotalAmountCloseModal,
    addTotalAmountModalIsOpen,
  } = useAddTotalAmountModal();
  const { data: totalAmount } = useGetTotalAmount();

  return (
    <div className="flex flex-col p-8 items-center justify-center">
      <p className="text-gray-400 text-lg">TOTAL BALANCE</p>
      <div
        className="flex gap-4"
        onClick={() => {
          if (totalAmount?.amount !== 0) {
            setTotalAmountToEdit(totalAmount);
          } else {
            setTotalAmountToEdit(null);
          }
        }}
      >
        <p className="text-white text-2xl font-bold">$ {totalAmount?.amount}</p>
        <div
          className="w-4 mt-1 cursor-pointer"
          onClick={() => {
            if (totalAmount?.amount !== 0) {
              setTotalAmountToEdit(totalAmount);
              addTotalAmountOpenModal();
            } else {
              setTotalAmountToEdit(null);
            }
          }}
        >
          {totalAmount?.amount === 0 ? (
            <PlusCircleIcon />
          ) : (
            <PencilSquareIcon />
          )}
        </div>
      </div>
      <AddTotalAmount
        AddTotalAmountCloseModal={addTotalAmountCloseModal}
        addTotalAmountModalIsOpen={addTotalAmountModalIsOpen}
        existingTotalAmount={totalAmountToEdit}
      />
    </div>
  );
};
