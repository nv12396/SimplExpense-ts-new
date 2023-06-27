import { NavLink } from "react-router-dom";

import { Cog6ToothIcon } from "@heroicons/react/24/outline";

export const Navbar = () => {
  return (
    <div className="flex-col container mx-auto px-4 w-full hidden md:flex">
      <div className="flex justify-between">
        <div className="flex gap-20 items-center">
          <h1 className="font-extrabold text-2xl text-white mt-4">
            SimplExpense
          </h1>
          <div className="flex gap-8 mt-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-[#c5c5c7]"
              }
            >
              <p className="cursor-pointer font-bold">Dashboard</p>
            </NavLink>
            <NavLink
              to="/transactions"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-[#959ba8]"
              }
            >
              <p className="cursor-pointer font-bold">Transaction</p>
            </NavLink>
            <NavLink
              to="/budget"
              className={({ isActive }) =>
                isActive ? "text-white" : "text-[#959ba8]"
              }
            >
              <p className="cursor-pointer font-bold">Budget</p>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 mt-4 text-white">
          <Cog6ToothIcon className="w-8 cursor-pointer" />
          <div className="flex gap-2 items-center justify-center mx-8">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src="https://img.freepik.com/free-vector/astronaut-catching-star-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3481.jpg?w=1380&t=st=1684262640~exp=1684263240~hmac=60ee3886319222ec38f76a61dffd6dc75523b92c4c2a7e580181785b7307cf89" />
              </div>
            </div>
            <p className="text-xl font-bold text-white">Nebojsa</p>
          </div>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};
