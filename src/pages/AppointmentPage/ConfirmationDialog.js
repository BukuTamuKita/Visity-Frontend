import React from 'react';
import Popup from '../../components/Popup';

const ConfirmDialog = props => {
    const { confirmDialog, setConfirmDialog, filteredHost } = props;

    return (
        <Popup open={confirmDialog.isOpen}>
            <div className="flex flex-col">
                <p className="text-lg font-bold text-grey-700">
                    {confirmDialog.title}
                </p>
                <p className="text-lg font-bold text-primary pt-2">
                    {filteredHost.name}
                </p>
                <p className="font-semibold text-grey-500">
                    {filteredHost.position}
                </p>
            </div>
            <div className="mt-6 flex md:flex-row justify-end gap-2 flex-col">
                <button
                    className="outline-btn order-2 md:order-1"
                    onClick={() =>
                        setConfirmDialog({ ...confirmDialog, isOpen: false })
                    }
                >
                    No
                </button>
                <button
                    className="secondary-btn font-semibold order-1 md:order-2"
                    onClick={confirmDialog.onConfirm}
                >
                    Yes, I want to make an appointment
                </button>
            </div>
        </Popup>
    );
};

export default ConfirmDialog;