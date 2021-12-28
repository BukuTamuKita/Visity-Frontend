import React from 'react';
import { Dialog } from '@mui/material';

const Popup = props => {
    const { children, open, onClose, title } = props;
    
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{ style: { borderRadius: 12 } }}
        >
            <div className="flex flex-col w-full">
                <div className="bg-primary p-4">
                    <p className="text-lg font-bold text-white">
                        { title }
                    </p>
                </div>
                <div className="p-4">
                    { children }
                </div>
            </div>
        </Dialog>
    );
};

export default Popup;