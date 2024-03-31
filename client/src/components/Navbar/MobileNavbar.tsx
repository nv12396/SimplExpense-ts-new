import { NavLink, useLocation } from "react-router-dom";

import { useAddTransactionModal } from "../../stores/transactionModal";
import { AddTransactionModal } from "../../features/transactions/modals/AddTransactionModal";
import { useAddBudgetModal } from "../../stores/budgetModal";
import { AddBudgetModal } from "../../features/budget/components/AddBudgetModal";

export const MobileNavbar = () => {
  const {
    addTransactionModalIsOpen,
    addTransactionCloseModal,
    addTransactionOpenModal,
  } = useAddTransactionModal();

  const {
    addBudgetModalIsOpen,
    addBudgetCloseModal,
    addBudgetOpenModal,
    addBudgetToEdit,
  } = useAddBudgetModal();

  const search = useLocation();
  return (
    <div className="w-full block md:hidden fixed z-50 h-16 -translate-x-1/2 bg-[#013736] bottom-0 left-1/2 shadow-md">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <button
          data-tooltip-target="tooltip-home"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 "
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primaryGreen" : "text-[#c5c5c7]"
            }
          >
            <svg
              className="w-6 h-6 mb-1 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </NavLink>
          <span className="sr-only">Home</span>
        </button>

        <div
          id="tooltip-home"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5"
        >
          <NavLink
            to="/transactions"
            className={({ isActive }) =>
              isActive ? "text-primaryGreen" : "text-[#c5c5c7]"
            }
          >
            <svg
              className="w-6 h-6 mb-1 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              ></path>
            </svg>
          </NavLink>
          <span className="sr-only">Wallet</span>
        </button>
        <div
          id="tooltip-wallet"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Wallet
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              if (search.pathname === "/budget") {
                addBudgetToEdit(null);
                addBudgetOpenModal();
              } else {
                addTransactionOpenModal();
              }
            }}
            data-tooltip-target="tooltip-new"
            type="button"
            className="bg-gradient-to-tr from-pink-800 via-teal-800 to-blue-400 inline-flex items-center justify-center w-16 absolute bottom-6 overflow-auto shadow-xl h-16 font-medium bg-[#292d32] rounded-full "
            // className="bg-gradient-to-r from-cyan-700 to-primaryGreen inline-flex items-center justify-center w-16 absolute bottom-6 overflow-auto shadow-xl h-16 font-medium bg-[#292d32] rounded-full "
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              ></path>
            </svg>
            <span className="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create new item
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          data-tooltip-target="tooltip-settings"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5"
        >
          <NavLink
            to="/budget"
            className={({ isActive }) =>
              isActive ? "text-primaryGreen" : "text-[#c5c5c7]"
            }
          >
            <svg
              className="w-6 h-6 mb-1 "
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
            </svg>
          </NavLink>
          <span className="sr-only">Settings</span>
        </button>
        <div
          id="tooltip-settings"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Settings
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <button
          data-tooltip-target="tooltip-profile"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5"
        >
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              isActive ? "text-primaryGreen" : "text-[#c5c5c7]"
            }
          >
            <svg
              className="w-6 h-6 mb-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
              ></path>
            </svg>
          </NavLink>
          <span className="sr-only">Profile</span>
        </button>
        <div
          id="tooltip-profile"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
      <div>
        <AddTransactionModal
          AddTransactionCloseModal={addTransactionCloseModal}
          addTransactionModalIsOpen={addTransactionModalIsOpen}
        />
        <AddBudgetModal
          AddBudgetCloseModal={addBudgetCloseModal}
          addBudgetModalIsOpen={addBudgetModalIsOpen}
          addBudgetToEdit={addBudgetToEdit}
        />
      </div>
    </div>
  );
};
