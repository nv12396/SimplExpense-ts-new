import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  ChartBarIcon,
  CogIcon,
  BanknotesIcon,
  ArrowDownIcon,
  UserIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

type MainLayoutProps = {
  children: React.ReactNode;
};

const Sidebar = () => {
  return (
    <div className="min-w-16 w-16 bg-primary h-screen flex flex-col justify-between items-center pl-2">
      <BanknotesIcon className="w-8 text-secondaryGreen mt-8" />
      <div className="w-8 text-primaryGreen gap-8 flex flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-secondaryGreen" : "text-gray-400"
          }
        >
          <HomeIcon />
        </NavLink>
        <NavLink
          to="proba"
          className={({ isActive }) =>
            isActive ? "text-secondaryGreen" : "text-gray-400"
          }
        >
          <ChartBarIcon />
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            isActive ? "text-secondaryGreen" : "text-gray-400"
          }
        >
          <CogIcon />
        </NavLink>
      </div>
      <div className="avatar">
        <div className="w-10 mb-9 rounded-full">
          <img src="https://img.freepik.com/free-vector/astronaut-catching-star-cartoon-vector-icon-illustration-science-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3481.jpg?w=1380&t=st=1684262640~exp=1684263240~hmac=60ee3886319222ec38f76a61dffd6dc75523b92c4c2a7e580181785b7307cf89" />
        </div>
      </div>
    </div>
  );
};

export const ContentSidebar = () => {
  return (
    <div className="w-64 min-w-64 min-h-full h-full ">
      <div className="border-r-2 h-full border-[#1f1f2c] flex justify-center">
        <div className="flex flex-col justify-between">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn m-1 bg-secondary text-gray-200 flex justify-between gap-2 text-sm hover:bg-secondary border-0 rounded-none border-b-2"
            >
              <div className="w-4 mr-2">
                <UserIcon style={{ color: "#78ED92" }} />
              </div>
              <p className="mr-10 text-xs">Accounts</p>
              <div className="w-4">
                <ArrowDownIcon />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
          <div>
            <button className="btn w-full items-center justify-center flex gap-2 bg-secondaryGreen text-black mb-4 hover:bg-primaryGreen">
              <div className="w-4 font-bold ml-[-15px]">
                <PlusIcon />
              </div>
              <p className="font-extra-bold">ADD ACCOUNT</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex max-h-screen bg-primary">
      <Sidebar />
      <div className="flex rounded-xl bg-secondary w-full m-4">
        {/* <ContentSidebar /> */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};
