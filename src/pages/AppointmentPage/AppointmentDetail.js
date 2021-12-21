import React, { useState } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import { IconButton, Tooltip } from '@mui/material';
import { InfoOutlined, EventNoteRounded, AccessTimeRounded } from '@mui/icons-material';
import Popup from '../../components/Popup';
import { getToken } from '../../utils/auth';
import { COLORS } from '../../constants/colors'; 
import { Status } from '../../components/Status';
import { APPOINTMENT_DETAIL } from '../../constants/urls';

const AppointmentDetail = props => {
    const { id } = props;
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
    let attr = {
        title: 'Appointment Detail',
    }

    const handleNotes = () => {
        if (appointment.status === 'canceled') {
            return 'Notes To Host';
        }
        else if (
            appointment.status === 'accepted' ||
            appointment.status === 'declined'
        ) {
            return "Notes to Guest";
        }
        else{
            return 'Notes';
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
            .get(APPOINTMENT_DETAIL(id), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(res => {
                setAppointment(res.data.data);
                setLoading(false);
            })
            .catch(err => {
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
            <Popup open={open} onClose={handleClose} title={attr.title}>
                {loading ? (
                    <span className="flex justifty-center items-center">
                        <Loader type="Oval" radius={18} color={COLORS.primary} secondaryColor={COLORS.accent} height={24} width={24} />
                    </span>
                ) : (
                    <>
                        <div className="flex flex-row justify-between items-center md:gap-10 gap-4 mb-6">
                            <div>
                                <p className="font-bold text-primary">{ appointment.host.name }</p>
                                <div className="flex md:flex-row flex-col gap-2 justify-start text-xs text-gray-500 pt-2">
                                    <span className="flex flex-row items-center gap-1 whitespace-nowrap">
                                        <EventNoteRounded sx={{ fontSize: "0.75rem" }} />
                                        { appointment.date_time[0] } 
                                    </span>
                                    <span className="flex flex-row items-center gap-1 whitespace-nowrap">
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
                                <label className="label">{ handleNotes() }</label>
                                <p>{ appointment.notes ? appointment.notes : "-" }</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="outline-btn mt-6" onClick={handleClose}>Close</button>
                        </div>
                    </>
                )}
            </Popup>
        </>
    )
};

export default AppointmentDetail;