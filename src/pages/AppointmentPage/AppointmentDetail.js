import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { InfoOutlined } from '@mui/icons-material';
import { APPOINTMENT_DETAIL } from '../../constants/urls';
import { getToken } from '../../utils/auth'; 

export const AppointmentDetail = ({ meetingId }) => {
    let [isOpen, setIsOpen] = useState(false);
    const [appointment, setAppointment] = useState({
        id: 0,
        notes: '',
        status: '',
        purpose: '',
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

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
        fetchAppointment();
    };

    const fetchAppointment = () => {
        axios
            .get(APPOINTMENT_DETAIL(meetingId), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setAppointment(res.data.data);
            })
            .catch((err) => console.log(err))
    };

    return (
        <>
            <div className="flex items-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="secondary-btn"
                >
                    <InfoOutlined />
                    Meeting Detail
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-25"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                {/* {appointment.map((value, index))} */}
                                {/* { appointment.host.map((value, index) => (
                                    <p>{ value.name }</p>
                                ))} */}
                                <p>{ appointment.guest.name }</p>
                                <p>{ appointment.host.name }</p>
                                <p>{ appointment.date_time[0] }</p>
                                <p>{ appointment.date_time[1] }</p>
                                <button onClick={closeModal} className="outline-btn">Close</button>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
};