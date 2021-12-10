import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../../components/SearchUser/SearchUser';
import { getToken } from '../../utils/auth';
import { capitalizeFirstLetter } from '../../utils/utility';
import HostAgenda from './HostAgenda';
import ScanKTP from './ScanKTP/ScanKTP';
import {
    BASE_URL,
    CREATE_APPOINTMENT,
    CREATE_GUEST,
    SEND_NOTIFICATION,
    SHOW_HOST_APPOINTMENT,
} from '../../constants/urls';
import Loader from 'react-loader-spinner';

const CreateAppointment = () => {
    let guestId = 0;
    const [guestInfo, setGuestInfo] = useState({});
    const [display, setDisplay] = useState(false);
    const [email, setEmail] = useState('');
    const [purpose, setPurpose] = useState('');
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState([]);
    const [filteredHost, setFilteredHost] = useState({
        id: 1,
        name: '',
        nip: '',
        position: '',
        users: null,
    });

    const searchBarAttr = {
        style: 'w-full mb-4',
        placeholder: 'Search host name',
    };

    const authAxios = axios.create({
        baseURL: BASE_URL,
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    useEffect(() => {
        axios
            .get(SHOW_HOST_APPOINTMENT(filteredHost.id), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setAppointment(res.data.data);
            })
            .catch((err) => console.log(err))
        
        return () => {
            setAppointment([]);
        }
    }, [filteredHost.id]);

    const getFilteredHost = (host) => {
        setFilteredHost(host);

        if (host !== null) {
            setDisplay(true);
        }
    };

    const createGuest = () => {
        authAxios
            .post(CREATE_GUEST, {
                name: capitalizeFirstLetter(guestInfo.name),
                nik: capitalizeFirstLetter(guestInfo.nik),
                address: capitalizeFirstLetter(guestInfo.address),
                email: email,
            })
            .then((res) => {
                guestId = res.data.id;
                createAppointment();
            })
            .catch((err) => console.log(err))
    };

    const sendNotification = () => {
        axios
            .post(SEND_NOTIFICATION, {
                name: filteredHost.name,
                gname: capitalizeFirstLetter(guestInfo.name),
                body: purpose,
            })
            .catch((err) => console.log(err))
    };

    const createAppointment = () => {
        setLoading(true);
        authAxios
            .post(CREATE_APPOINTMENT, {
                host: filteredHost.id,
                guest: guestId,
                purpose: purpose,
            })
            .then(() => {
                sendNotification();
                window.location.reload();
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            }) 
    };

    return (
        <div className="p-16 grid grid-cols-12">
            <div className="flex-auto flex-column col-span-12 mb-12">
                <p className="text-4xl text-primary font-bold mb-2">
                    Create Appointment
                </p>
                <p className="text-lg text-primary">
                    Fill the form below to make an appointment
                </p>
            </div>
            <div className="flex flex-row col-span-10 gap-20">
                <div className="rounded-lg p-6 shadow-lg flex-1 bg-white">
                    <div className="mb-6">
                        <p className="text-2xl text-gray-700 mb-4 font-bold">
                            Who would you like to meet today?
                        </p>
                        <SearchBar
                            placeholder="Search host"
                            attribute={searchBarAttr}
                            getFilteredHost={getFilteredHost}
                        />
                    </div>
                    <div>
                        <ScanKTP setGuestInfo={setGuestInfo} />
                        <div>
                            <div className="mb-4">
                                <label htmlFor="nik" className="label">NIK</label>
                                <input
                                    type="text"
                                    id="nik"
                                    placeholder="Enter your NIK"
                                    autoComplete="nik"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                    defaultValue={guestInfo.nik}
                                    onChange={(e) => setGuestInfo({...guestInfo, nik: e.target.value})}
                                /> 
                            </div>
                            <div className="mb-4">
                                <label htmlFor="name" className="label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your name"
                                    autoComplete="name"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                    defaultValue={
                                        guestInfo
                                            ? capitalizeFirstLetter(
                                                  guestInfo.name
                                              )
                                            : guestInfo.name
                                    }
                                    onChange={(e) =>
                                        setGuestInfo({
                                            ...guestInfo,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="label">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    placeholder="Enter your address"
                                    autoComplete="address"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                    defaultValue={
                                        guestInfo
                                            ? capitalizeFirstLetter(
                                                  guestInfo.address
                                              )
                                            : guestInfo.address
                                    }
                                    onChange={(e) =>
                                        setGuestInfo({
                                            ...guestInfo,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your Email"
                                    autoComplete="email"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-6 row-span-2">
                                <label htmlFor="agenda" className="label">Agenda</label>
                                <textarea
                                    type="text"
                                    id="agenda"
                                    placeholder="Enter your agenda"
                                    autoComplete="agenda"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                    onChange={(e) => setPurpose(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-row justify-end gap-x-5">
                                <button
                                    className="primary-btn"
                                    type="submit"
                                    onClick={() => createGuest()}
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
                        </div>
                    </div>
                </div>

                <HostAgenda display={display} appointment={appointment} filteredHost={filteredHost} />
            </div>
        </div>
    );
};

export default CreateAppointment;