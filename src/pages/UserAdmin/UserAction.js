import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import { deleteUser } from './UserService';
import { COLORS } from '../../constants/colors';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';

const UserAction = props => {
    const { id, fetchUsers } = props;
    const [confirmDialog, setConfirmDialog] = useState({ 
        isOpen: false, 
        title: '', 
        content: '' 
    });
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });

    const handleDeleteUser = () => {
        deleteUser(id, setNotify);
        fetchUsers();
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        // setNotify({
        //     isOpen: true,
        //     message: `Users with ID ${id} successfully deleted!`,
        //     type: 'success',
        // });
    };

    return (
        <>
            <Tooltip title="Delete User" arrow>
                <IconButton
                    sx={{
                        "&:hover": { backgroundColor: COLORS.dangerShade },
                        zIndex: 1,
                    }}
                    onClick={() => {
                        setConfirmDialog({
                            isOpen: true,
                            title: 'Are you sure to delete this user?',
                            onConfirm: () => { handleDeleteUser() }
                        });
                    }} 
                >
                    <DeleteOutlineRoundedIcon sx={{ color: COLORS.danger }} />
                </IconButton>
            </Tooltip>
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog} 
            />
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

export default UserAction;