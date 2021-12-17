import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, IconButton, Tooltip, Backdrop, CircularProgress } from '@mui/material';
import { InfoOutlined, EventNoteRounded, AccessTimeRounded } from '@mui/icons-material';
import { getToken } from '../../utils/auth';
import { COLORS } from '../../constants/colors'; 
import { APPOINTMENT_DETAIL } from '../../constants/urls';
import { Status } from '../../components/Status';


export const AppointmentDetail = (props) => {
    const { meetingId } = props;
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState({
        date_time: [],
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
    });
    const handleNotes =()=> {
        if (appointment.status ==="canceled") {
            return "Notes To Host"
        }
        else if (
            appointment.status === "accepted" ||
            appointment.status === "declined"
        ) {
            return "Notes to Guest";
        }
        else{
            return "-";
        }
    };
    const handleClickOpen = () => {
        setOpen(true);
        fetchAppointment();
    };

    const handleClose = () => {
        setOpen(false);
    };

    const fetchAppointment = () => {
        setLoading(true);
        axios
            .get(APPOINTMENT_DETAIL(meetingId), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setAppointment(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            }) 
    };

    return (
        <>
            <Tooltip title="Appointment Info" arrow>
                <IconButton 
                    sx={{ 
                        '&:hover': { backgroundColor: COLORS.primaryOutline }
                    }}  
                    onClick={handleClickOpen}
                >
                    <InfoOutlined sx={{ color: COLORS.primary }} />
                </IconButton>
            </Tooltip>
            <Dialog onClose={handleClose} open={open}>
                {loading ? (
                    <span className="flex justifty-center items-center">
                        <Backdrop
                            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                            open={loading}
                        >
                            <CircularProgress color="inherit" />
                        </Backdrop>
                    </span>
                ) : (
                    <div className="p-6">
                        <div className="flex flex-row justify-between items-center gap-10 mb-6">
                            <div>
                                <p className="font-bold text-primary">{ appointment.host.name }</p>
                                <div className="flex flex-row gap-2 items-center text-xs text-gray-300">
                                    <span className="flex flex-row items-center gap-1">
                                        <EventNoteRounded sx={{ fontSize: "0.75rem" }} />
                                        { appointment.date_time[0] } 
                                    </span>
                                    <span className="flex flex-row items-center gap-1">
                                        <AccessTimeRounded sx={{ fontSize: "0.75rem" }} />
                                        { appointment.date_time[1] }
                                    </span>
                                </div>
                            </div>
                            {appointment.status !== null && (
                                <span>
                                    <Status value={appointment.status} />
                                </span>
                            )}
                        </div>
                        <div className="text-gray-700">
                            <div className="mb-4">
                                <label className="label">Guest Name</label>
                                <p>{ appointment.guest.name }</p>
                            </div>
                            <div className="mb-4">
                                <label className="label">Purpose</label>
                                <p>{ appointment.purpose }</p>
                            </div>
                            <div>
                                <label className="label">{handleNotes() }</label>
                                <p>{ appointment.notes }</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="outline-btn mt-6" onClick={handleClose}>Close</button>
                        </div>
                    </div>
                )}
            </Dialog>
        </>
    )
};