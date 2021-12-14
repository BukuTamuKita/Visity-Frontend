import React, { useState } from 'react';
import { IconButton, Dialog, Avatar, Tooltip } from '@mui/material';
import { HighlightOffOutlined, ReportGmailerrorredRounded } from '@mui/icons-material';
import { COLORS } from '../../constants/colors';
import Loader from 'react-loader-spinner';

export const GuestAction = (props) => {
    const { id, action, loading } = props;
    const [note, setNote] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Tooltip title="Cancel Appointment" arrow>
                <IconButton 
                    sx={{ 
                        '&:hover': { backgroundColor: COLORS.warningShade }
                    }}  
                    onClick={handleClickOpen}
                >
                    <HighlightOffOutlined sx={{ color: COLORS.warning }} />
                </IconButton>
            </Tooltip>
            <Dialog open={open} onClose={handleClose}>
                <div className="p-6">
                    <div className="flex flex-row justify-between items-center gap-6 mb-6">
                        <span className="text-lg text-primary font-bold">Are you sure to cancel the appointment?</span>
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
                        <button className="outline-btn" onClick={handleClose}>Close</button>
                        <button className="primary-btn" onClick={() => action(note, id)}>
                            {loading ? (
                                <span className="flex justifty-center items-center">
                                    <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                                </span>
                            ) : (
                                <span>Submit</span>
                            )}
                        </button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};