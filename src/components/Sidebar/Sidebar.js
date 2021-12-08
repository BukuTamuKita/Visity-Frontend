import React from 'react';
import { ListItemIcon } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import { LogoutOutlined } from '@mui/icons-material';
import ListItemText from '@mui/material/ListItemText';
import SidebarData from './SidebarData';
import { logout } from '../../utils/auth';
import { COLORS } from '../../constants/colors';

const Sidebar = () => {
    return (
        <div className="flex flex-col flex-1 justify-between mt-12 mb-6 mx-2">
            <ul className="flex flex-col gap-2">
                {SidebarData.map((item, index) => {
                    return (
                        <div key={item.path} className="flex-auto">
                            <NavLink
                                exact
                                to={item.path}
                            >
                                <ListItem
                                    button key={item.title} 
                                    sx={{ 
                                        color: "white",
                                        borderRadius: 1.5,
                                        '&:active': {
                                            backgroundColor: COLORS.secondary,
                                            color: COLORS.primary,
                                        },
                                     }}>
                                    <ListItemIcon 
                                        sx={{ 
                                            color: "white", 
                                            '&:active': {
                                                backgroundColor: COLORS.secondary,
                                                color: COLORS.primary,
                                            }, 
                                        }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItem>
                            </NavLink>
                        </div>
                    );
                })}
            </ul>
            <div>
                <Link to="/" onClick={logout}>
                    <ListItem 
                        button
                        sx={{ 
                            color: "white",
                            borderRadius: 1.5,
                        }}>
                        <ListItemIcon sx={{ color: "white", }}>
                            <LogoutOutlined />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </ListItem>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;