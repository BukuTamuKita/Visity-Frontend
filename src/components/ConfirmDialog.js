import React from 'react';
import Popup from './Popup';

const ConfirmDialog = props => {
    const { confirmDialog, setConfirmDialog } = props;
    
    return (
        <Popup open={confirmDialog.isOpen}>
            <div className="flex flex-col">
                <p className="text-lg font-bold">{ confirmDialog.title }</p>
                <p>{ confirmDialog.content }</p>
            </div>
            <div className="mt-6 flex flex-row justify-end gap-2">
                <button
                    className="outline-btn" 
                    onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
                >
                    No
                </button>
                <button
                    className="primary-btn"
                    onClick={confirmDialog.onConfirm}
                >
                    Yes
                </button>
            </div>
        </Popup>
    );
};

export default ConfirmDialog;