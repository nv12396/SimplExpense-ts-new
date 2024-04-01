import { NavLink } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import logo from "./../../assets/logo_transparent.png";
import { logoutFn } from "../../lib/auth";

export const SidebarDemo = () => {
  return (
    <div className="bg-[#013736] h-screen min-h-screen flex flex-col">
      <div className="flex justify-center -ml-4">
        <img src={logo} alt="logo" className="max-h-48" />
      </div>
      <div className="mt-8 flex flex-col justify-between h-full">
        <ul className="flex flex-col items-start text-white text-sm lg:text-[17px] max-w-[250px] px-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? // ? "bg-[#015a50] text-white w-full rounded-xl py-3 pl-2"
                  "text-white w-full my-3 border-l-4 max-h-8 flex items-center pl-4"
                : "my-3 text-gray-400 flex items-center pl-5"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer max-h-8">
              <div className="pl-2">{/* <MdSpaceDashboard /> */}</div>

              <p className="font-semibold">Dashboard</p>
            </li>
          </NavLink>
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive
                ? "text-white w-full my-3 border-l-4 max-h-8 flex items-center pl-4"
                : "my-3 text-gray-400 flex items-center pl-5"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <div className="pl-2">{/* <TbArrowsRightLeft /> */}</div>
              <p className="font-semibold">Transactions</p>
            </li>
          </NavLink>
          <NavLink
            to="/budget"
            className={({ isActive }) =>
              isActive
                ? "text-white w-full my-3 border-l-4 max-h-8 flex pl-4 items-center"
                : "my-3 text-gray-400 flex items-center pl-5"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <div className="pl-2">{/* <MdSavings /> */}</div>
              <p className="font-semibold">Budget</p>
            </li>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive
                ? "text-white w-full my-3 border-l-4 max-h-8 flex items-center pl-4"
                : "my-3 text-gray-400 flex items-center pl-5"
            }
          >
            <li className="flex gap-4 items-center cursor-pointer">
              <div className="pl-2">{/* <FaCog /> */}</div>
              <p className="font-semibold">Settings</p>
            </li>
          </NavLink>
        </ul>
        <div
          className="flex gap-2 items-center md:ml-6 lg:ml-16 mb-8 cursor-pointer text-white"
          onClick={logoutFn}
        >
          <BiLogOutCircle style={{ fontWeight: "900" }} />
          <p className="font-bold">Logout</p>
        </div>
      </div>
    </div>
  );
};
