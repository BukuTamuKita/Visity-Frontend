import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
import HostAgenda from './HostAgenda';
import ScanKTP from './ScanKTP/ScanKTP';
import { getToken } from '../../utils/auth';
import { createGuest } from './AppointmentService';
import SearchUser from '../../components/SearchUser';
import Notification from '../../components/Notification';
import ConfirmDialog from '../../components/ConfirmDialog';
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
    const [filteredHost, setFilteredHost] = useState(initialHost());
    const [newAppointment, setNewAppointment] = useState(initialAppointment());
    const [search, setSearch] = useState('');
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', content: '' });

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
            setGuestInfo({
                ...guestInfo,
                [name]: value,
            });
        } else {
            setNewAppointment({
                ...newAppointment,
                [name]: value,
            });
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
        createGuest(guestInfo, newAppointment, filteredHost);
        setConfirmDialog({ ...confirmDialog, isOpen: false });
        setNotify({
            isOpen: true,
            message: 'Appointment successfully created!',
            type: "success",
        });
        resetForm();
        setLoading(false);
    };

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);

        if (filteredHost.id) {
            setConfirmDialog({
                isOpen: true,
                title: 'Are you sure to make this appointment?',
                onConfirm: () => { handleCreateData() }
            });
        } else {
            setNotify({
                isOpen: true,
                message: 'No host selected!',
                type: 'warning',
            });
            setLoading(false);
        }
    };

    return (
        <main>
            <div className="lg:grid lg:grid-cols-12 grid grid-cols-4 ">
                <div className="fixed -z-10">
                    <svg
                        width="208"
                        height="158"
                        viewBox="0 0 208 158"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M-112.244 -401.254C-40.3804 -400.552 30.5669 -467.057 95.2391 -435.713C160.246 -404.208 180.566 -321.041 197.942 -250.923C214.318 -184.837 207.071 -117.816 190.373 -51.8108C172.528 18.7327 160.851 102.303 98.9217 140.508C37.4905 178.404 -40.4496 142.324 -112.244 134.874C-175.093 128.352 -239.98 132.858 -293.8 99.7528C-350.318 64.9878 -389.52 9.46002 -415.437 -51.6237C-443.346 -117.401 -462.416 -189.023 -445.811 -258.52C-428.411 -331.346 -391.533 -410.34 -322.694 -439.796C-255.483 -468.556 -185.346 -401.968 -112.244 -401.254Z"
                            fill="#E7EAF5"
                        />
                    </svg>
                </div>
                <div className="fixed bottom-0 -right-10 z-0">
                    <svg
                        width="384"
                        height="605"
                        viewBox="0 0 384 605"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M339.756 45.7464C411.62 46.4484 482.567 -20.0565 547.239 11.2867C612.246 42.792 632.566 125.959 649.942 196.077C666.318 262.163 659.071 329.184 642.373 395.189C624.528 465.733 612.851 549.303 550.922 587.508C489.491 625.404 411.55 589.324 339.756 581.874C276.907 575.352 212.02 579.858 158.2 546.753C101.682 511.988 62.4798 456.46 36.5626 395.376C8.65395 329.599 -10.4156 257.977 6.18894 188.48C23.589 115.654 60.4674 36.6604 129.306 7.204C196.517 -21.5557 266.654 45.0323 339.756 45.7464Z"
                            fill="#E7EAF5"
                        />
                    </svg>
                </div>
                <div className="lg:col-start-2 lg:col-end-12 lg:my-16 z-10 col-span-4 sm:my-12 sm:mx-4 p-4">
                    <div className="flex flex-col pb-4">
                        <p className="lg:text-4xl text-primary font-bold mb-2 text-2xl">
                            Create Appointment
                        </p>
                        <p className="lg:text-lg text-primary text-sm">
                            Fill the form below to make an appointment
                        </p>
                    </div>
                    <div className="lg:flex lg:flex-row lg:gap-12 w-full">
                        <div className=" lg:w-1/2 w-full sm:p-6 p-4 rounded-lg border-2 border-grey-400 shadow-mobile inline-flex flex-col bg-white ">
                            <div>
                                <p>Who would you like to meet</p>
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
                            <form id="appointment-form" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="nik" className="label">NIK</label>
                                    <input 
                                        required
                                        type="text"
                                        id="nik"
                                        name="nik"
                                        defaultValue={guestInfo.nik}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="name" className="label">Name</label>
                                    <input 
                                        required
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue={guestInfo ? 
                                            capitalizeFirstLetter(guestInfo.name)
                                        : newAppointment.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="label">Address</label>
                                    <input 
                                        required
                                        type="text"
                                        id="address"
                                        name="address"
                                        defaultValue={guestInfo ? 
                                            capitalizeFirstLetter(guestInfo.address)
                                        : newAppointment.address}
                                        onChange={handleChange}
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
                                    />
                                </div>
                                <div>
                                    <button
                                        className="secondary-btn font-semibold"
                                        type="submit"
                                    >
                                        {loading ? (
                                            <span className="flex justifty-center items-center">
                                                <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                                            </span>
                                        ) : (
                                            <span>Create Appointment</span>
                                        )}
                                    </button>
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
            </div>
            <ConfirmDialog 
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog} 
            />
            <Notification notify={notify} setNotify={setNotify} />
        </main>
    );
};

export default CreateAppointment;