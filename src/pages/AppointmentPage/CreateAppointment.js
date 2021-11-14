import React, {
    useState,
    useEffect,
} from "react";
import axios from "axios";
import { 
    CREATE_APPOINTMENT, 
    CREATE_GUEST, 
    JWT_HEADER, 
    SCAN_KTP, 
    SHOW_HOSTS, 
    SHOW_HOST_APPOINTMENT,
} from "../../constants/urls";
import { useHistory } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getToken, isLogin } from "../../utils/auth";
import { buttonPrimary, buttonSecondary, inputField } from "../../components/Styles";

const CreateAppointment = () => {
    // const [guestId, setGuestId] = useState();
    let guestId = 0;
    const [guestInfo, setGuestInfo] = useState({});
    const [display, setDisplay] = useState(false);
    const [displayFileName, setDisplayFileName] = useState(false);

    // Guest
    const [photo, setPhoto] = useState({});
    const [email, setEmail] = useState("");

    // Appointment
    const [purpose, setPurpose] = useState("");
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
        style: "w-full mb-4",
        placeholder: "Search host name",
    };

    const authAxios = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            Authorization: `Bearer ${JWT_HEADER}`,
        },
    });

    const fetchHosts = async () => {
        const response = await axios.get(SHOW_HOSTS, {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
        .catch((err) => console.log(err))

        if (response && isLogin()) {
          const hosts = response.data;
    
          console.log("hosts: ", hosts);
          setHosts(response.data.data);
        }
    };

    useEffect(() => {
        fetchHosts();
    }, []);
  
    const fetchAppointment = async () => {
        const response = await axios.get(SHOW_HOST_APPOINTMENT(filteredHost.id), {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .catch((err) => console.log(err))

        if (response && isLogin()) {
            const appointment = response.data;

            console.log("appointment: ", appointment);
            setAppointment(response.data.data);
        }
    };

    useEffect(() => {
        fetchAppointment();
    }, [filteredHost.id]);

    const getFilteredHost = (host) => {
        console.log("host terpilih:", host);
        setFilteredHost(host);
        // filteredHost = {
        //     ...host
        // };

        if (host !== null) {
            setDisplay(true);
            console.log("filtered host: ", filteredHost);
        }
    };

    const handleKTPImage = (e) => {
        let file = e.target.files[0];
        setPhoto(file);
        setDisplayFileName(!displayFileName);
    };

    const scanKTP = () => {
        let file = photo;
        let formData = new FormData();

        formData.append('image', file);

        axios
            .post(SCAN_KTP, formData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                console.log("KTP response: ", res);
                setGuestInfo(res.data[0]);
            })
    };

    const createGuest = async () => {
        const response = await authAxios.post(CREATE_GUEST, {
            name: capitalizeFirstLetter(guestInfo.name),
            nik: capitalizeFirstLetter(guestInfo.nik),
            address: capitalizeFirstLetter(guestInfo.address), 
            email: email,
        })
        .catch((err) => console.log(err))

        if (response) {
            console.log("new guest id:", response.data.id);
            guestId = response.data.id;
            createAppointment();
        }
    };

    const createAppointment = async () => {
        const response = await authAxios.post(CREATE_APPOINTMENT, {
            host: filteredHost.id,
            guest: guestId,
            purpose: purpose,
        })
        .catch((err) => console.log(err))

        if (response) {
            console.log(response);
            history.push("/appointment-history");
            window.location.reload();
        }
    };

    const getStatusStyle = (value) => {
        if (value === "accepted") {
            return (
                <div className="text-xs text-center text-green-500 font-semibold py-1 px-2 border rounded-2xl bg-green-100">
                    { value }
                </div>
            )
        } else if (value === "waiting") {
            return (
                <div className="text-xs text-center text-yellow-500 font-semibold py-1 px-2 border rounded-2xl bg-yellow-100">
                    { value }
                </div>
            )
        } else if (value === "declined") {
            return (
                <div className="text-xs text-center text-red-500 font-semibold py-1 px-2 border rounded-2xl bg-red-100">
                    { value }
                </div>
            )
        }
    };

    const capitalizeFirstLetter = (words) => {
        if (words) {
            words = "" + words;
            const arr = words.split(" ");
    
            for (let i = 0; i < arr.length; i++) {
                arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1).toLowerCase();
            }
    
            const result = arr.join(" ");   
            console.log("result: ", result);
            return result;
        }
        
        return "";
    };

    return (
        <div className="py-24 px-16 grid grid-cols-12">
            <p className="col-span-12 text-4xl mb-10 text-primary">Create Appointment</p>
            {/* Section 1 */}
            <div className="col-span-5 divide-y divide-solid divide-gray-300">
                <div className="pb-6">
                    <p className="text-2xl mb-4">
                        Who would you like to meet today?
                    </p>

                    <SearchBar
                        placeholder="Cari nama..."
                        attribute={searchBarAttr}
                        data={hosts}
                        getFilteredHost={getFilteredHost}
                    />
                </div>

                {/* Section 2 */}
                <div>
                    {/* Scan KTP Section */}
                    <div className="mt-10 mb-6">
                        <p className="text-2xl mb-4">Please input your data</p>
                        {/* Input KTP File */}
                        <label className="text-sm mb-1">Scan KTP</label>
                        <div className="w-full h-52 rounded-lg border-2 border-dashed border-gray-300 col-span-4 flex flex-col justify-center items-center mb-6 bg-red-yellow-100">
                            <div>
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth={2}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600 justify-center">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-lg font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            onChange={(e) => handleKTPImage(e)}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                {
                                    displayFileName ? (
                                        <div>
                                            <p className="text-xs text-gray-500 text-center">Upload status: <strong>Succeed</strong></p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-500 text-center">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    )
                                }
                            </div>
                        </div>

                        {/* Scan Button */}
                        <div className="flex justify-end">
                            <button
                                className={`${buttonSecondary}`}
                                type="submit"
                                onClick={scanKTP}
                            >
                                Scan
                            </button>
                        </div>
                    </div>

                    <div className="">
                        <div className="mb-4">
                            <label
                                htmlFor="nik"
                                className="block text-sm mb-1 font-medium text-gray-600"
                            >
                                NIK
                            </label>
                            <input
                                type="text"
                                name="nik"
                                id="nik"
                                placeholder="Enter your NIK"
                                autoComplete="nik"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                defaultValue={guestInfo.nik}
                                // defaultValue={nik}
                                // value={tempData.nik}
                                // onChange={(e) => setNik(e.target.value)}
                                // onChange={(e) => setTempData({ ...tempData, nik: e.target.value })}
                                onChange={(e) => setGuestInfo({ ...guestInfo, nik: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="block text-sm mb-1 font-medium text-gray-600"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                autoComplete="name"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                defaultValue={guestInfo ? capitalizeFirstLetter(guestInfo.name) : guestInfo.name}
                                // defaultValue={guestInfo ? capitalizeFirstLetter(name) : name}
                                // value={tempData.name}
                                // onChange={(e) => setName(e.target.value)}
                                // onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                                onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="address"
                                className="block text-sm mb-1 font-medium text-gray-600"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder="Enter your address"
                                autoComplete="address"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                defaultValue={guestInfo ? capitalizeFirstLetter(guestInfo.address) : guestInfo.address}
                                onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="block text-sm mb-1 font-medium text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your Email"
                                autoComplete="email"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-6 row-span-2">
                            <label
                                htmlFor="agenda"
                                className="block text-sm mb-1 font-medium text-gray-600"
                            >
                                Agenda
                            </label>
                            <textarea
                                type="text"
                                name="agenda"
                                id="agenda"
                                placeholder="Enter your agenda"
                                autoComplete="agenda"
                                className={`${inputField}`}
                                onChange={(e) => setPurpose(e.target.value)}
                            />
                        </div>

                        <div className="flex flex-row justify-end gap-x-5">
                            <button
                                className={`${buttonPrimary}`}
                                type="submit"
                                onClick={() => {
                                    createGuest();
                                }}
                            >
                                Make Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {display ? (
                <div className="col-start-7 col-span-4 h-auto flex flex-col border rounded-lg border-gray-200 shadow divide-y divide-gray-100">
                    <div className="flex gap-4 p-4">
                        {/* <div className="h-12 w-12 rounded-full flex justify-center items-center">
                            <p className="text-xs">Image</p>
                            <img alt="host-profile" className="h-12 w-12 rounded-full flex justify-center items-center" src={photo}></img>
                        </div> */}
                        <div className="flex flex-col">
                            <p className="text-base font-semibold">{ filteredHost.name }</p>
                            <p className="text-sm text-gray-500">{ filteredHost.position }</p>
                        </div>
                    </div>
                    <div className="flex flex-col p-4">
                        <p className="text-2xl font-semibold mb-8">Meeting List</p>
                        {
                            appointment.length !== 0 && 
                            appointment.map((data) => {
                            return (
                                <div className="mb-1" key={data.id}>
                                    <div 
                                        key={data.id}
                                        className="flex justify-between text-base"
                                    >
                                        <p>{ data.guest.name }</p>
                                        { getStatusStyle(data.status) }
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col p-4 col-start-7 col-span-4">
                    <p>Meeting Information</p>
                    <div className="border border-gray-200 rounded-lg shadow py-6 flex flex-col justify-center items-center">
                        <p className="font-semibold">No Host Selected</p>
                        <p>Please find your host</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAppointment;