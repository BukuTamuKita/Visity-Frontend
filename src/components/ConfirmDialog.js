import React from 'react';
import Popup from './Popup';

const ConfirmDialog = props => {
    const { confirmDialog, setConfirmDialog, title } = props;
    
    return (
        <Popup open={confirmDialog.isOpen} title={title}>
            <div className="flex flex-col">
                <p className="text-lg font-bold text-grey-700">
                    { confirmDialog.title }
                </p>
                <p>{ confirmDialog.content }</p>
            </div>
            <div className="mt-6 flex md:flex-row flex-col justify-end gap-4">
                <button
                    className="outline-btn order-2 md:order-1"
                    onClick={() =>
                        setConfirmDialog({ ...confirmDialog, isOpen: false })
                    }
                >
                    No
                </button>
                <button
                    className="secondary-btn order-1 md:order-2"
                    onClick={confirmDialog.onConfirm}
                >
                    Yes, I want to delete user
                </button>
            </div>
        </Popup>
    );
};

export default ConfirmDialog;