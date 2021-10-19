import React, { useState } from "react";
import { BrowserRouter as Link} from "react-router-dom";
import SidebarData from "./SidebarData";

const btn = document.querySelector(".mobile-menu-button");
const sidebar = document.querySelector(".sidebar");

// add our event listener for the click
if (btn) {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("-translate-x-full");
  });
}

const Drawer = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  return (
    <div class="relative min-h-screen md:flex">
      <div class="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        <a href="#" class="block p-4 text-white font-bold">
          Visity
        </a>

        <button class="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div class="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
        <a href="#" class="text-white flex items-center space-x-2 px-4">
          <svg
            class="w-8 h-8"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
            />
          </svg>
          <span class="text-2xl font-extrabold">Visity</span>
        </a>

        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            {SidebarData.map((item) => {
              return (
                <>
                  <li key={item.path} className={item.cName}>
                    <Link to={item.path}>
                      <span>{item.title}</span>
                    </Link>
                  </li>
                </>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Drawer;
