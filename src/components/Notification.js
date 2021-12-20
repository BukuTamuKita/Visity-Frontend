import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';

const Notification = props => {
    const { notify, setNotify } = props;
    
    const handleClose = (event, reason) => {
        setNotify({ ...notify, isOpen: false, });
    };

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose ={handleClose}
            sx={{ zIndex: 100, marginTop: "4rem", }}
        >
            <Alert severity={notify.type} onClose ={handleClose}>
                { notify.message }
            </Alert>
        </Snackbar>
    );
}

export default Notification;