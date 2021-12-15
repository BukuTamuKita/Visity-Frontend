import React, { useState, useEffect } from "react";
import axios from "axios";
import { HighlightOffRounded } from "@mui/icons-material";
import SearchBar from "../../components/SearchUser/SearchUser";
import { getToken } from "../../utils/auth";
import { capitalizeFirstLetter } from "../../utils/utility";
import HostAgenda from "./HostAgenda";
import ScanKTP from "./ScanKTP/ScanKTP";
import {
    BASE_URL,
    CREATE_APPOINTMENT,
    CREATE_GUEST,
    SEND_NOTIFICATION,
    SHOW_HOST_APPOINTMENT,
} from "../../constants/urls";
import Loader from "react-loader-spinner";
import { COLORS } from "../../constants/colors";
import Notification from "../../components/Notification";

const CreateAppointment = () => {
    let guestId = 0;
    const [guestInfo, setGuestInfo] = useState({});
    const [display, setDisplay] = useState(false);
    const [email, setEmail] = useState("");
    const [purpose, setPurpose] = useState("");
    const [loading, setLoading] = useState(false);
    const [appointment, setAppointment] = useState([]);
    const [filteredHost, setFilteredHost] = useState({
        id: 1,
        name: "",
        nip: "",
        position: "",
        users: null,
    });
    const [errors, setErrors] = useState({});
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "success",
    });

    const searchBarAttr = {
        style: "w-full mb-4",
        placeholder: "Search host name",
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
            .catch((err) => console.log(err));

        return () => {
            setAppointment([]);
        };
    }, [filteredHost.id]);

    const getFilteredHost = (host) => {
        setFilteredHost(host);

        if (host !== null) {
            setDisplay(true);
        }
    };

    const handleSubmit = () => {
        setLoading(true);
        authAxios
            .post(CREATE_GUEST, {
                name: capitalizeFirstLetter(guestInfo.name),
                nik: capitalizeFirstLetter(guestInfo.nik),
                address: capitalizeFirstLetter(guestInfo.address),
                email: email,
            })
            .then((res) => {
                console.log("respon create guest", res);
                guestId = res.data.id;
                createAppointment();
                setLoading(true);
                setNotify({
                    isOpen: true,
                    message: `Appointment created successfully!`,
                    type: "success",
                });
            })
            .catch((err) => console.log(err));
    };

    const sendNotification = () => {
        axios
            .post(SEND_NOTIFICATION, {
                name: filteredHost.name,
                gname: capitalizeFirstLetter(guestInfo.name),
                body: purpose,
            })
            .then((res) => console.log("respon sendnotif", res))
            .catch((err) => console.log(err));
    };

    const createAppointment = () => {
        setLoading(true);
        authAxios
            .post(CREATE_APPOINTMENT, {
                host: filteredHost.id,
                guest: guestId,
                purpose: purpose,
            })
            .then((res) => {
                if (filteredHost.name !== "") {
                    console.log("respon create appoi", res);
                    sendNotification();
                    window.location.reload();
                    setLoading(false);
                } else {
                    setErrors({ host: "There's no host selected" });
                    setLoading(false);
                }
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
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
                            fill-rule="evenodd"
                            clip-rule="evenodd"
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
                            fill-rule="evenodd"
                            clip-rule="evenodd"
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
                            <div className="mb-6">
                                <p className="lg:text-2xl text-gray-700 mb-4 font-bold text-lg">
                                    Who would you like to meet today?
                                </p>
                                <SearchBar
                                    placeholder="Search host"
                                    attribute={searchBarAttr}
                                    getFilteredHost={getFilteredHost}
                                />
                            </div>
                            <div className="lg:hidden pb-4">
                                <HostAgenda
                                    display={display}
                                    appointment={appointment}
                                    filteredHost={filteredHost}
                                />
                            </div>
                            <div>
                                <ScanKTP setGuestInfo={setGuestInfo} />
                                <div>
                                    <div className="mb-4">
                                        <label htmlFor="nik" className="label">
                                            NIK
                                        </label>
                                        <input
                                            type="text"
                                            id="nik"
                                            placeholder="Enter your NIK"
                                            autoComplete="nik"
                                            required
                                            className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                            defaultValue={guestInfo.nik}
                                            onChange={(e) =>
                                                setGuestInfo({
                                                    ...guestInfo,
                                                    nik: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="label">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your name"
                                            autoComplete="name"
                                            required
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
                                        <label
                                            htmlFor="address"
                                            className="label"
                                        >
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            id="address"
                                            placeholder="Enter your address"
                                            autoComplete="address"
                                            required
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
                                        <label
                                            htmlFor="email"
                                            className="label"
                                        >
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Enter your Email"
                                            autoComplete="email"
                                            required
                                            className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="mb-10 row-span-2">
                                        <label
                                            htmlFor="agenda"
                                            className="label"
                                        >
                                            Agenda
                                        </label>
                                        <textarea
                                            type="text"
                                            id="agenda"
                                            placeholder="Enter your agenda"
                                            autoComplete="agenda"
                                            required
                                            className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                            onChange={(e) =>
                                                setPurpose(e.target.value)
                                            }
                                        />
                                    </div>

                                    {errors.host && (
                                        <div className="flex flex-row items-center gap-2 mb-4 border p-4 rounded-lg bg-dangerShade">
                                            <HighlightOffRounded
                                                sx={{
                                                    color: COLORS.danger,
                                                }}
                                            />
                                            <p className="text-danger">
                                                {errors.host}
                                            </p>
                                        </div>
                                    )}

                                    <div className="flex flex-row justify-end gap-x-5">
                                        <button
                                            className="secondary-btn font-semibold"
                                            onClick={() => handleSubmit()}
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
                            </div>
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
            <Notification notify={notify} setNotify={setNotify} />
        </main>
    );
};

export default CreateAppointment;
