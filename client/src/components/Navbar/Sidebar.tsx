import { NavLink } from "react-router-dom";
import { MdSpaceDashboard, MdSavings } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { TbArrowsRightLeft } from "react-icons/tb";

export const Sidebar = () => {
  return (
    <div className="bg-[#f9faff] h-screen min-h-screen flex flex-col border-r-2">
      <div className="text-center mt-4 min-h-44 h-44 flex flex-col items-center">
        <p className="text-black pt-2 text-xl">SimplExpense</p>
        <div className="avatar cursor-pointer">
          <div className="w-12 rounded-xl shadow-xl mt-2">
            <img src="https://i.etsystatic.com/27713397/r/il/52dbad/4355956410/il_fullxfull.4355956410_t98r.jpg" />
          </div>
        </div>
        <p className="mt-2">Nebojsa</p>
        <div className="divider px-8"></div>
      </div>
      <div className="mt-8 flex flex-col justify-between mr-12 h-full">
        <ul className="flex flex-col items-start ml-10 text-gray-500 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 text-white w-full rounded-lg py-3 pl-2"
                : "py-3 pl-2"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <MdSpaceDashboard style={{ fontWeight: "bold" }} />
              <p className="font-bold">Dashboard</p>
            </li>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 text-white w-full rounded-lg py-3 pl-2"
                : "py-3 pl-2"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <TbArrowsRightLeft style={{ fontWeight: "bold" }} />
              <p className="font-bold">Transactions</p>
            </li>
          </NavLink>
          <NavLink
            to="/budget"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 text-white w-full rounded-lg py-3 pl-2"
                : "py-3 pl-2"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <MdSavings />
              <p className="font-bold">Budget</p>
            </li>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-400 text-white w-full rounded-lg py-3 pl-2"
                : "py-3 pl-2"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <FaCog />
              <p className="font-bold">Settings</p>
            </li>
          </NavLink>
        </ul>
        <div className="flex gap-2 items-center ml-16 mb-8 cursor-pointer text-red-500">
          <BiLogOutCircle style={{ fontWeight: "900" }} />
          <p className="font-bold">Logout</p>
        </div>
      </div>
    </div>
  );
};
