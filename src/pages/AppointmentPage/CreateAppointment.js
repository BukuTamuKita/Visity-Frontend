import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/SearchBar/SearchBar';
import { getToken, isLogin } from '../../utils/auth';
import { capitalizeFirstLetter } from '../../utils/utility';
import HostAgenda from './HostAgenda';
import ScanKTP from './ScanKTP/ScanKTP';
import {
    CREATE_APPOINTMENT,
    CREATE_GUEST,
    SEND_NOTIFICATION,
    SHOW_HOSTS,
    SHOW_HOST_APPOINTMENT,
} from '../../constants/urls';

const CreateAppointment = () => {
    let guestId = 0;
    const [guestInfo, setGuestInfo] = useState({});
    const [display, setDisplay] = useState(false);
    // Guest
    const [email, setEmail] = useState('');
    // Appointment
    const [purpose, setPurpose] = useState('');
    const [hosts, setHosts] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [filteredHost, setFilteredHost] = useState({
        id: 1,
        name: '',
        nip: '',
        position: '',
        users: null,
    });

    const history = useHistory();

    const searchBarAttr = {
        style: 'w-full mb-4',
        placeholder: 'Search host name',
    };

    const authAxios = axios.create({
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });

    const fetchHosts = async () => {
        const response = await axios
            .get(SHOW_HOSTS, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .catch((err) => console.log(err));

        if (response && isLogin()) {
            setHosts(response.data.data);
        }
    };

    useEffect(() => {
        fetchHosts();
    }, []);

    const fetchAppointment = async () => {
        const response = await axios
            .get(SHOW_HOST_APPOINTMENT(filteredHost.id), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .catch((err) => console.log(err));

        if (response && isLogin()) {
            setAppointment(response.data.data);
        }
    };

    useEffect(() => {
        fetchAppointment();
    }, [filteredHost.id]);

    const getFilteredHost = (host) => {
        setFilteredHost(host);

        if (host !== null) {
            setDisplay(true);
        }
    };

    const createGuest = async () => {
        const response = await authAxios
            .post(CREATE_GUEST, {
                name: capitalizeFirstLetter(guestInfo.name),
                nik: capitalizeFirstLetter(guestInfo.nik),
                address: capitalizeFirstLetter(guestInfo.address),
                email: email,
            })
            .catch((err) => console.log(err));

        if (response) {
            guestId = response.data.id;
            createAppointment();
        }
    };

    const sendNotification = () => {
        axios
            .post(SEND_NOTIFICATION, {
                name: filteredHost.name,
                gname: capitalizeFirstLetter(guestInfo.name),
                body: purpose,
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err))
    };

    const createAppointment = async () => {
        const response = await authAxios
            .post(CREATE_APPOINTMENT, {
                host: filteredHost.id,
                guest: guestId,
                purpose: purpose,
            })
            .catch((err) => console.log(err));

        if (response) {
            console.log(response);
            sendNotification();
            window.location.reload();
        }
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
                        <p className="text-2xl mb-4 font-bold">
                            Who would you like to meet today?
                        </p>
                        <SearchBar
                            placeholder="Search host"
                            attribute={searchBarAttr}
                            data={hosts}
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
                                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm border-gray-300 rounded-lg placeholder-gray-300"
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
                                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm border-gray-300 rounded-lg placeholder-gray-300"
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
                                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
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
                                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4 row-span-2">
                                <label htmlFor="agenda" className="label">Agenda</label>
                                <textarea
                                    type="text"
                                    id="agenda"
                                    placeholder="Enter your agenda"
                                    autoComplete="agenda"
                                    className="mt-1 focus:ring-primary focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                    onChange={(e) => setPurpose(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-row justify-end gap-x-5">
                                <button
                                    className="primary-btn"
                                    type="submit"
                                    onClick={() => createGuest()}
                                >
                                    Make Appointment
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