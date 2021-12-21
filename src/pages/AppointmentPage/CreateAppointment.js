import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import HostAgenda from './HostAgenda';
import ScanKTP from './ScanKTP/ScanKTP';
import { getToken } from '../../utils/auth';
import { createGuest } from './AppointmentService';
import SearchUser from '../../components/SearchUser';
import ConfirmationDialog from './ConfirmationDialog';
import Notification from '../../components/Notification';
import { capitalizeFirstLetter } from '../../utils/utility';
import { SHOW_HOST_APPOINTMENT } from '../../constants/urls';

const CreateAppointment = () => {
    const [guestInfo, setGuestInfo] = useState({});
    const [display, setDisplay] = useState(false);
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });
    const initialAppointment = () => {
        return {
            guestId: 0,
            guestEmail: '',
            guestPurpose: '',
        };
    };
    const initialHost = () => {
        return {
            id: null,
            name: '',
            nip: '',
            position: '',
            users: null,
        };
    };
    const [search, setSearch] = useState('');
    const [filteredHost, setFilteredHost] = useState(initialHost());
    const [newAppointment, setNewAppointment] = useState(initialAppointment());
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '' });

    useEffect(() => {
        if (filteredHost.id) {
            axios
                .get(SHOW_HOST_APPOINTMENT(filteredHost.id), {
                    headers: { Authorization: `Bearer ${getToken()}` },
                })
                .then(res => {
                    setAppointment(res.data.data);
                })
                .catch(err => console.log(err));

            return () => {
                setAppointment([]);
            };
        }
    }, [filteredHost.id]);

    const getFilteredHost = host => {
        setFilteredHost(host);

        if (host !== null) {
            setDisplay(true);
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;

        if (name === 'nik' || name === 'name' || name === 'address') {
            setGuestInfo({ ...guestInfo, [name]: value });
        } else {
            setNewAppointment({ ...newAppointment, [name]: value });
        }
    };

    const resetForm = () => {
        setSearch('');
        setNewAppointment(initialAppointment());
        setGuestInfo({});
        setFilteredHost(initialHost());
        setDisplay(false);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        document.getElementById('appointment-form').reset();
    };

    const handleCreateData = () => {
        createGuest(guestInfo, newAppointment, filteredHost, setLoading, setNotify);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        resetForm();
    };

    const handleSubmit = e => {
        e.preventDefault();
        
        if (filteredHost.id) {
            setConfirmDialog({
                isOpen: true,
                title: "Are you sure to make this appointment?",
                onConfirm: () => { handleCreateData() },
            });
        } else {
            setNotify({
                isOpen: true,
                message: "No host selected!",
                type: "warning",
            });
        }
    };

    return (
        <>
            <div className="lg:col-start-2 lg:col-end-12 lg:my-16 z-10 col-span-4 sm:my-12 sm:mx-4 p-4">
                <div className="flex flex-col pb-4">
                    <p className="lg:text-4xl text-primary font-bold mb-1 text-2xl">
                        Create Appointment
                    </p>
                    <p className="lg:text-lg text-primary text-sm font-medium">
                        Fill the form below to make an appointment
                    </p>
                </div>
                <div className="lg:flex lg:flex-row lg:gap-12 w-full">
                    <div className=" lg:w-3/4 xl:w-1/2 w-full sm:p-6 p-4 rounded-lg border-2 border-grey-400 shadow-mobile inline-flex flex-col bg-white ">
                        <div>
                            <p className="md:font-bold md:text-lg font-semibold text-base">
                                Who would you like to meet?
                            </p>
                            <SearchUser
                                getFilteredHost={getFilteredHost}
                                search={search}
                                setSearch={setSearch}
                                setDisplay={setDisplay}
                            />
                        </div>
                        <div className="lg:hidden pb-4">
                            <HostAgenda
                                display={display}
                                appointment={appointment}
                                filteredHost={filteredHost}
                            />
                        </div>
                        <ScanKTP setGuestInfo={setGuestInfo} />
                        <form
                            id="appointment-form"
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-1"
                        >
                            <div>
                                <label htmlFor="nik" className="label">NIK</label>
                                <input
                                    required
                                    type="text"
                                    id="nik"
                                    name="nik"
                                    value={guestInfo.nik || ""}
                                    onChange={handleChange}
                                    placeholder="Fill 16 Character"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="name" className="label">Name</label>
                                <input
                                    required
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={guestInfo ? 
                                        capitalizeFirstLetter(guestInfo.name)
                                        : newAppointment.name || ""
                                    }
                                    onChange={handleChange}
                                    placeholder="Please Fill with Full Name"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="label">Address</label>
                                <input
                                    required
                                    type="text"
                                    id="address"
                                    name="address"
                                    placeholder="Ex: Jalan Budiman No.17 60152"
                                    value={guestInfo ? 
                                        capitalizeFirstLetter(guestInfo.address)
                                        : newAppointment.address || ""
                                    }
                                    onChange={handleChange}
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="label">Email</label>
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="Ex: Budiman@email.com"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                />
                            </div>
                            <div>
                                <label htmlFor="purpose" className="label">Purpose</label>
                                <textarea
                                    required
                                    type="text"
                                    id="purpose"
                                    name="purpose"
                                    onChange={handleChange}
                                    placeholder="Ex: I want to meet about new plan for my company"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                />
                            </div>
                            <div className="flex justify-end">
                                <div className="pt-4 justify-end inline-flex">
                                    <button
                                        className="secondary-btn font-semibold"
                                        type="submit"
                                    >
                                        {loading ? (
                                            <span className="flex justifty-center items-center">
                                                <Loader
                                                    className="mx-auto"
                                                    type="Oval"
                                                    color="#FFFFFF"
                                                    height={24}
                                                    width={24}
                                                />
                                            </span>
                                        ) : (
                                            <span>Create Appointment</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="lg:visible invisible">
                        <HostAgenda
                            display={display}
                            appointment={appointment}
                            filteredHost={filteredHost}
                        />
                    </div>
                </div>
            </div>
            <ConfirmationDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
                filteredHost={filteredHost}
            />
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

export default CreateAppointment;