import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarData from "./SidebarData";
import { logout } from "../../utils/auth";
import { List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

// const btn = document.querySelector(".mobile-menu-button");
// const sidebar = document.querySelector(".sidebar");

// add our event listener for the click
// if (btn) {
//     btn.addEventListener("click", () => {
//         sidebar.classList.toggle("-translate-x-full");
//     });
// }

const Sidebar = () => {
    // const [sidebar, setSidebar] = useState(false);
    // const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            {/* <List>
                {SidebarData.map((data, index) => (
                    <ListItem button key={data.path}>
                        <NavLink
                            exact
                            to={data.path}
                            className="block py-2.5 px-4 items-center rounded transition duration-200 ease-in-out hover:bg-primary-hover hover:text-white"
                            activeClassName="transition duration-500 ease-in-out bg-secondary text-white"
                        >
                            <ListItemIcon>
                                {data.icon}
                            </ListItemIcon>
                            <span>{data.title}</span>
                        </NavLink>
                    </ListItem>
                ))}
            </List> */}

            <ul className="flex flex-col gap-2">
                {SidebarData.map((item, index) => {
                    return (
                        <div key={item.path} className="flex-auto">
                            <NavLink
                                exact
                                to={item.path}
                                className="block py-2.5 px-4 items-center rounded transition duration-200 ease-in-out hover:bg-primary-hover hover:text-white"
                                activeClassName="transition duration-500 ease-in-out bg-secondary text-white"
                            >
                                <div className="flex flex-row items-center gap-x-2">
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <span>{item.title}</span>
                                </div>
                            </NavLink>
                        </div>
                    );
                })}
            </ul>
        </>
    );
};

export default Sidebar;
