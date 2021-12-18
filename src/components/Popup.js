import React from 'react';
import { Dialog } from '@mui/material';

const Popup = props => {
    const { children, open, onClose } = props;
    
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{ style: { borderRadius: 12 } }}
        >
            <div className="p-6">{ children }</div>
        </Dialog>
    );
};

export default Popup;