import React, { useState } from 'react';
import { IconButton, Avatar, Tooltip } from '@mui/material';
import { HighlightOffOutlined, ReportGmailerrorredRounded } from '@mui/icons-material';
import Popup from '../../components/Popup';
import { COLORS } from '../../constants/colors';
import { cancelAppointment } from './GuestService';
import Notification from '../../components/Notification';

export const GuestAction = props => {
    const { id, fetchAppointments } = props;
    const [note, setNote] = useState('');
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({ 
        isOpen: false, 
        message: '', 
        type: 'success' 
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelMeeting = () => {
        cancelAppointment(note, id);
        fetchAppointments();
        handleClose();
        setNotify({
            isOpen: true,
            message: 'Appointment canceled!',
            type: 'success',
        })
    };

    return (
        <>
            <Tooltip title="Cancel Appointment" arrow>
                <IconButton 
                    sx={{ '&:hover': { backgroundColor: COLORS.warningShade } }}  
                    onClick={handleClickOpen}
                >
                    <HighlightOffOutlined sx={{ color: COLORS.warning }} />
                </IconButton>
            </Tooltip>
            <Popup open={open} onClose={handleClose}>
                <div className="flex flex-row justify-between items-center gap-6 mb-6">
                    <span className="text-lg text-primary font-bold">
                        Are you sure to cancel the appointment?
                    </span>
                    <span>
                        <Avatar sx={{ backgroundColor: COLORS.warningShade }}>
                            <ReportGmailerrorredRounded sx={{ color: COLORS.warning }}/>
                        </Avatar>
                    </span>
                </div>
                <div className="mb-6 row-span-2">
                    <label htmlFor="note" className="label">Note to host</label>
                    <textarea
                        type="text"
                        id="note"
                        placeholder="Leave message to host"
                        autoComplete="note"
                        className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-500 border-gray-300 rounded-lg placeholder-gray-300"
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>
                <div className="flex flex-row justify-end items-center gap-4">
                    <button className="outline-btn" onClick={handleClose}>
                        Close
                    </button>
                    <button className="primary-btn" onClick={handleCancelMeeting}>
                        Submit
                    </button>
                </div>
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};