import * as React from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function DescriptionAlerts(props) {
    const { notify, setNotify } = props;
    
    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false,
        });
    };

    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            onClose ={handleClose}
        >
            <Alert severity={notify.type} onClose ={handleClose}>
                {/* This is an error alert — <strong>check it out!</strong> */}
                { notify.message }
            </Alert>
        </Snackbar>
    );
  }