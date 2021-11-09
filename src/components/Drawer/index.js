import React, { useState } from "react";
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link,
    // useHistory
} from "react-router-dom";
import SidebarData from "./SidebarData";
import { logout } from "../../utils/auth";

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
    // const history = useHistory();

    // const onLogout = () => {
    //   logout();
    //   history.push("/");
    // }

    return (
        <div className="relative min-h-screen md:flex">
            {/* Responsive Sidebar Title */}
            <div className="bg-blue-800 text-gray-100 flex flex-row justify-between md:hidden">
                <a href="/#" className="block p-4 text-white font-bold">
                    Visity
                </a>
                <button className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
                    <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>

            {/* Sidebar Title */}
            <div className="sidebar flex flex-col bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
                <a
                    href="/#"
                    className="text-white flex items-center space-x-2 px-4"
                >
                    <svg
                        className="w-8 h-8"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                        />
                    </svg>
                    <span className="text-2xl font-extrabold">Visity</span>
                </a>

                {/* Sidebar Menu */}
                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                        <ul
                            className="nav-menu-items auto-cols-auto"
                            onClick={showSidebar}
                        >
                            {SidebarData.map((item, index) => {
                                return (
                                    <div key={item.path} className="flex-auto">
                                        <Link to={item.path}>
                                            <li className={item.cName}>
                                                <span>{item.title}</span>
                                            </li>
                                        </Link>
                                    </div>
                                );
                            })}

                            {/* <div>
              <button onClick={onLogout}>Logout</button>
            </div> */}
                        </ul>
                    </nav>
                    <div>
                        <Link to="/" onClick={logout}>
                            <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
                                <span>Logout</span>
                            </li>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
