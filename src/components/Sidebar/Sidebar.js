import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SidebarData from './SidebarData';
import { logout } from '../../utils/auth';
import { LogoutIcon } from '@heroicons/react/outline';
import { ListItemIcon } from '@mui/material';

const Sidebar = () => {
    return (
        <div className="flex flex-col flex-1 justify-between my-6 mx-2">
            <ul className="flex flex-col gap-2">
                {SidebarData.map((item, index) => {
                    return (
                        <div key={item.path} className="flex-auto">
                            <NavLink
                                exact
                                to={item.path}
                                className="block py-2.5 px-4 text-white items-center rounded transition duration-200 ease-in-out hover:bg-primary-hover hover:text-white"
                                activeClassName="transition duration-500 ease-in-out bg-secondary text-primary"
                            >
                                <div className="flex flex-row items-center gap-x-2">
                                    <ListItemIcon>
                                        {item.icon}
                                    </ListItemIcon>
                                    <span className="-ml-4">{item.title}</span>
                                </div>
                            </NavLink>
                        </div>
                    );
                })}
            </ul>
            <div>
                <Link to="/" onClick={logout}>
                    <li className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-hover hover:text-white">
                        <div className="flex flex-row items-center gap-x-2">
                            <div className="flex flex-row items-center gap-x-2">
                                <ListItemIcon>
                                    <LogoutIcon className="w-6" />
                                </ListItemIcon>
                                <span>Logout</span>
                            </div>
                        </div>
                    </li>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;