import { NavLink } from "react-router-dom";
import { MdSpaceDashboard, MdSavings } from "react-icons/md";
import { FaCog } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { TbArrowsRightLeft } from "react-icons/tb";
import logo from "./../../assets/logo_transparent.png";

export const Sidebar = () => {
  return (
    // <div className="bg-gradient-to-r from-cyan-700 to-primaryGreen h-screen min-h-screen flex flex-col border-r-2">
    <div className="bg-[#013736] h-screen min-h-screen flex flex-col border-r-2">
      <div className="flex justify-center">
        <img src={logo} alt="logo" className="max-h-60" />
      </div>
      <div className="mt-8 flex flex-col justify-between mr-12 3xl:ml-8 h-full">
        <ul className="flex flex-col items-start ml-10 text-white text-lg max-w-[250px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "bg-[#015a50] text-white w-full rounded-xl py-3 pl-2"
                : "py-3 pl-2 text-gray-400"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <div className="pl-2">
                <MdSpaceDashboard />
              </div>

              <p>Dashboard</p>
            </li>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? "bg-[#015a50] text-white w-full rounded-xl py-3 pl-2"
                : "py-3 pl-2 text-gray-400"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <div className="pl-2">
                <TbArrowsRightLeft />
              </div>
              <p>Transactions</p>
            </li>
          </NavLink>
          <NavLink
            to="/budget"
            className={({ isActive }) =>
              isActive
                ? "bg-[#015a50] text-white w-full rounded-xl py-3 pl-2"
                : "py-3 pl-2 text-gray-400"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <div className="pl-2">
                <MdSavings />
              </div>
              <p>Budget</p>
            </li>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "bg-[#015a50] text-white w-full rounded-xl py-3 pl-2"
                : "py-3 pl-2 text-gray-400"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <div className="pl-2">
                <FaCog />
              </div>
              <p>Settings</p>
            </li>
          </NavLink>
        </ul>
        <div className="flex gap-2 items-center ml-16 mb-8 cursor-pointer text-white">
          <BiLogOutCircle style={{ fontWeight: "900" }} />
          <p className="font-bold">Logout</p>
        </div>
      </div>
    </div>
  );
};