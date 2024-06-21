// ../components/Navbar.jsx

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import { auth } from "../firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { useGlobalContext } from "../hooks/useGlobalContext";

function themeFromLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

function Navbar() {
  const { total, user } = useGlobalContext();
  const [theme, setTheme] = useState(themeFromLocalStorage());

  const displayName = user?.displayName || "User";
  const email = user?.email || "user@example.com";
  const photoURL = user?.photoURL;

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // Handle sign-out errors.
        console.error("Sign-out error:", error);
      });
  };

  const handleTheme = () => {
    const newTheme = theme === "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-200 w-full text-base-content rounded mb-10 p-8 ">
      <nav className="flex items-center justify-between flex-wrap">
        <div className="left">
          <NavLink to="/">
            <svg
              className="fill-slate-600"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 23.631 23.631"
              xmlSpace="preserve"
            >
              <path d="M0 0.663L9.401 0.663 15.882 7.146 15.882 14.127 5.307 3.608 5.274 22.969 0 22.969z"></path>
              <path d="M23.631 22.969L14.232 22.969 7.752 16.485 7.752 9.501 18.327 20.018 18.359 0.662 23.631 0.662z"></path>
            </svg>
          </NavLink>
        </div>
        <div className="center flex gap-10">
          <ul className="flex gap-10 list-none">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <div className="right flex items-center gap-6">
          {/* Cart indicator */}
          <NavLink to="/Cart">
            <div className="indicator">
              <span className="indicator-item badge badge-md badge-secondary">
                {total}
              </span>
              <FaCartPlus className="w-7 h-7" />
            </div>
          </NavLink>
          {/* Theme switch */}
          <label className="swap swap-rotate">
            <input
              onClick={handleTheme}
              type="checkbox"
              className="theme-controller"
              value="synthwave"
              checked={theme === "dracula"}
              readOnly
            />
            <IoMdSunny
              className={`swap-off fill-current w-10 h-10 ${
                theme === "dracula" ? "hidden" : "block"
              }`}
            />
            <IoMdMoon
              className={`swap-on fill-current w-10 h-10 ${
                theme === "dracula" ? "block" : "hidden"
              }`}
            />
          </label>
          {/* User profile dropdown */}
          <div className="dropdown relative">
            <button className="btn focus:btn-outline normal-case ">
              <span>{displayName}</span>
              <svg
                width="12px"
                height="12px"
                className="h-2 w-2 fill-current opacity-60 inline-block"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 2048 2048"
              >
                <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
              </svg>
            </button>

            <div className="dropdown-content z-[1] menu p-2 w-80 -ml-72 mt-10">
              <div className="rounded-lg bg-base-300 p-3 drop-shadow-xl divide-y divide-neutral ">
                <div className="flex space-x-4 items-center p-4">
                  <div className="flex mr-auto items-center space-x-4">
                    <img
                      src={
                        photoURL ||
                        "https://avatars.githubusercontent.com/u/26052038?v=4"
                      }
                      alt="Profile"
                      className="w-16 h-16 shrink-0 rounded-full"
                    />
                    <div className="space-y-2 flex flex-col flex-1 truncate">
                      <div className="relative leading-tight ">
                        <span className="flex">
                          <span className="truncate relative pr-8 ">
                            {displayName}
                          </span>
                        </span>
                      </div>
                      <p className="font-normal text-base leading-tight truncate">
                        {email}
                      </p>
                    </div>
                  </div>
                </div>
                <div aria-label="navigation" className="py-2">
                  <nav className="grid gap-1">
                    <NavLink
                      to="/"
                      className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                    >
                      <svg
                        className="w-7 h-7"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H9C10.1046 3 11 3.89543 11 5V9C11 10.1046 10.1046 11 9 11H5C3.89543 11 3 10.1046 3 9V5ZM9 5H5V9H9V5Z" />
                        <path d="M3 15C3 13.8954 3.89543 13 5 13H9C10.1046 13 11 13.8954 11 15V19C11 20.1046 10.1046 21 9 21H5C3.89543 21 3 20.1046 3 19V15ZM9 15H5V19H9V15Z" />
                        <path d="M13 5C13 3.89543 13.8954 3 15 3H19C20.1046 3 21 3.89543 21 5V9C21 10.1046 20.1046 11 19 11H15C13.8954 11 13 10.1046 13 9V5ZM19 5H15V9H19V5Z" />
                        <path d="M13 15C13 13.8954 13.8954 13 15 13H19C20.1046 13 21 13.8954 21 15V19C21 20.1046 20.1046 21 19 21H15C13.8954 21 13 20.1046 13 19V15ZM19 15H15V19H19V15Z" />
                      </svg>
                      <span>Панель управления</span>
                    </NavLink>
                    <NavLink
                      to="/"
                      className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                    >
                      <svg
                        className="w-7 h-7"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                      </svg>
                      <span>Профиль</span>
                    </NavLink>
                    <button
                      onClick={logOut}
                      className="flex items-center leading-6 space-x-3 py-3 px-4 w-full text-lg text-gray-600 focus:outline-none hover:bg-gray-100 rounded-md"
                    >
                      <svg
                        className="w-7 h-7"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                        <path d="M9 12h12l-3 -3"></path>
                        <path d="M18 15l3 -3"></path>
                      </svg>
                      <span>Выход</span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
