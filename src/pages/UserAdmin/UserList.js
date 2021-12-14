import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Dialog, IconButton, Tooltip } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { DELETE_USER, SHOW_USERS } from '../../constants/urls';
import Table from '../../components/Table/Table';
import { getToken } from '../../utils/auth';
import { capitalizeFirstLetter } from '../../utils/utility';
import Notification from '../../components/Notification';
import { COLORS } from '../../constants/colors';

export const UserAction = (props) => {
    const { id, action } = props;

    return (
        <Tooltip title="Delete User" arrow>
            <IconButton 
                sx={{ 
                    '&:hover': { backgroundColor: COLORS.dangerShade },
                    zIndex: 1,
                }} 
                onClick={() => action(id)}
            >
                <DeleteOutlineRoundedIcon sx={{ color: COLORS.danger }} />
            </IconButton>
        </Tooltip>
    );
};

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });
    const [openPopup, setOpenPopup] = useState(false);

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Name",
            accessor: "name",
        },
        {
            Header: "Email",
            accessor: "email",
        },
        {
            Header: "Role",
            accessor: "role",
            Cell: ({ value }) => {
                return (
                    value === "admin" ? (
                        <div className="flex flex-row items-center gap-2">
                            <span className="w-1.5 h-1.5 border rounded-full bg-primary"></span>
                            <p>{ capitalizeFirstLetter(value) }</p>
                        </div>
                    ) : (
                        <p>{ capitalizeFirstLetter(value) }</p>
                    )
                )
            }
        },
        {
            Header: "Photo",
            accessor: "photo",
        }
    ], []);

    const fetchUsers = () => {
        axios
            .get(SHOW_USERS, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setUsers(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    };

    useEffect(() => {
        setLoading(true);
        fetchUsers();
        
        return () => {
            setUsers([]);
        } 
    }, []);

    const userData = useMemo(() => [...users], [users]);
    const userColumn = useMemo(() => [...columns], [columns]);

    const deleteUser = (meetingId) => {
        if (window.confirm(`Are you sure want to delete user with id: ${meetingId} ?`)) {
            axios 
                .delete(DELETE_USER(meetingId), {
                    headers: { Authorization: `Bearer ${getToken()}` }
                })
                .then(() => {
                    // const newUsers = [...users];
                    // const index = users.findIndex((user) => user.id === meetingId);
                    // newUsers.splice(index, 1);
                    // setUsers(newUsers);
                    fetchUsers();
                    setNotify({
                        isOpen: true,
                        message: `Users with ID ${meetingId} successfully deleted!`,
                        type: 'success',
                    });
                    
                })
                .catch((err) => console.log(err))
        }
    };

    return (
        <>
            <div className="py-16 px-16">
                <div className="flex flex-col mb-12">
                    <p className="text-4xl text-primary font-bold mb-2">Users</p>
                    <p className="text-lg text-primary">Showing all the users in this app</p>
                </div>
                <Table 
                    columns={userColumn}
                    data={userData}
                    loading={loading}
                    action={deleteUser}
                    // setOpenPopup={setOpenPopup}
                    fetchUsers={fetchUsers}
                />
            </div>
            {/* <Dialog>
                <div className="p-6">

                </div>
            </Dialog> */}
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
}

export default UserAdmin;