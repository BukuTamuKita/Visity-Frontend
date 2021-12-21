import React, { useState } from 'react';
import axios from 'axios';
import { IconButton, Avatar, Tooltip } from '@mui/material';
import { HighlightOffOutlined, ReportGmailerrorredRounded } from '@mui/icons-material';
import Popup from '../../components/Popup';
import { getToken } from '../../utils/auth';
import { COLORS } from '../../constants/colors';
import { cancelAppointment } from './GuestService';
import Notification from '../../components/Notification';
import { APPOINTMENT_DETAIL } from "../../constants/urls";

export const GuestAction = props => {
    const { id, fetchAppointments } = props;
    const [note, setNote] = useState('');
    const [open, setOpen] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });
    const initiateAppointment = () => {
        return {
            id: '',
            guest: {
                id: 0,
                email: '',
                nik: '',
                name: '',
                address: '',
            },
            host: {
                id: 0,
                name: '',
                nip: '',
                position: '',
                users: {},
            },
            purpose: '',
        };
    };
    const [appointment, setAppointment] = useState(initiateAppointment());

    const fetchAppointment = () => {
        axios
            .get(APPOINTMENT_DETAIL(id), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(res => {
                setAppointment(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    };

    const handleClickOpen = () => {
        setOpen(true);
        fetchAppointment();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancelMeeting = e => {
        e.preventDefault();
        cancelAppointment(note, id, setNotify);
        handleClose();
        setTimeout(() => {
            fetchAppointments();
        }, 3000);
    };

    return (
        <>
            <Tooltip title="Cancel Appointment" arrow>
                <IconButton
                    sx={{ "&:hover": { backgroundColor: COLORS.warningShade } }}
                    onClick={handleClickOpen}
                >
                    <HighlightOffOutlined sx={{ color: COLORS.warning }} />
                </IconButton>
            </Tooltip>
            <Popup open={open} onClose={handleClose}>
                <div className="flex flex-row justify-between items-center gap-4">
                    <span className="text-lg text-primary font-bold">
                        Are you sure to cancel Appointment?
                    </span>
                    <span>
                        <Avatar sx={{ backgroundColor: COLORS.warningShade }}>
                            <ReportGmailerrorredRounded
                                sx={{ color: COLORS.warning }}
                            />
                        </Avatar>
                    </span>
                </div>
                <div className="flex flex-col py-4">
                    <p className="text-lg font-bold text-primary">
                        {appointment.host.name}
                    </p>
                    <p className="text-sm text-grey-500 font-medium">
                        {appointment.host.position}
                    </p>
                    <p className="text-sm text-grey-700 font-medium pt-4">
                        Purpose:
                    </p>
                    <p className="text-lg text-grey-700 font-medium">
                        {appointment.purpose}
                    </p>
                </div>
                <form onSubmit={handleCancelMeeting}>
                    <div className="mb-6 row-span-2">
                        <label htmlFor="note" className="label">
                            Note to host
                        </label>
                        <textarea
                            required
                            type="text"
                            id="note"
                            placeholder="Leave message to host"
                            autoComplete="note"
                            className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-500 border-gray-300 rounded-lg placeholder-gray-300"
                            onChange={(e) => setNote(e.target.value)}
                        />
                    </div>
                    <div className="flex md:flex-row flex-col justify-end items-center gap-4">
                        <button
                            className="outline-btn w-full order-2 md:w-min md:order-1"
                            onClick={handleClose}
                            type="button"
                        >
                            Close
                        </button>
                        <button
                            className="secondary-btn whitespace-nowrap order-1 w-full md:w-min md:order-2"
                            type="submit"
                        >
                            Yes, I want to cancel
                        </button>
                    </div>
                </form>
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};