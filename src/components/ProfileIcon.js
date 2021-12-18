import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logout from '@mui/icons-material/Logout';
import { Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip} from '@mui/material';
import { getToken, logout } from '../utils/auth';
import { GET_USER_LOGGED_IN, SHOW_PHOTO } from '../constants/urls';

const ProfileIcon = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [admin, setAdmin] = useState({});

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        axios
            .post(GET_USER_LOGGED_IN, getToken(), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(res => {
                setAdmin(res.data.data);
            })
            .catch(err => console.log(err));

        return () => {
            setAdmin({});
        };
    }, []);

    return (
        <div className="flex flex-row items-center">
            <p className="text-gray-700">Hello, <span className="font-semibold">{ admin.name }</span></p>
            <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
                <Tooltip title="Profile" arrow>
                    <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                        <Avatar>
                            <img 
                                className="h-10 w-10 rounded-full" 
                                src={SHOW_PHOTO(admin.photo)}
                                alt="Admin" />
                        </Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Link to="/" onClick={logout}>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Link>
            </Menu>
        </div>
    );
}

export default ProfileIcon;