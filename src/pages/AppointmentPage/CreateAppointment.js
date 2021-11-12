import React, {
    useState,
    useEffect,
} from "react";
import axios from "axios";
import { 
    CREATE_APPOINTMENT, 
    JWT_HEADER, 
    SHOW_HOSTS, 
    SHOW_HOST_APPOINTMENT,
    SHOW_USER, 
} from "../../constants/urls";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getToken, isLogin } from "../../utils/auth";

const CreateAppointment = () => {
    const [guestId, setGuestId] = useState();
    const [name, setName] = useState("");
    const [nik, setNik] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [purpose, setPurpose] = useState("");
    const [hosts, setHosts] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [filteredHost, setFilteredHost] = useState({});
    const [photo, setPhoto] = useState("");
    const [display, setDisplay] = useState(false);

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
  }, [filteredHost]);

  const fetchUser = async () => {
      const response = await axios.get(SHOW_USER(filteredHost.id), {
          headers: { Authorization: `Bearer ${getToken()}` },
      })
      .catch((err) => console.log(err))

      if (response && isLogin()) {
        const photo = response.data;

        console.log("photo: ", photo);
        setPhoto(response.data.data.photo);
      }
  };

    // const createAppointment = async () => {
    //     try {
    //         console.log(typeof filteredHost, typeof guestId, purpose);
    //         const result = await authAxios.post("appointments", {
    //             host: filteredHost.id,
    //             guest: guestId,
    //             purpose: purpose,
    //         });
    //         console.log(result);
    //     } catch (err) {
    //         console.log("error: ", err);
    //     }
    // };

    const createAppointment = async () => {
        const response = await authAxios.post(CREATE_APPOINTMENT, {
            host: filteredHost.id,
            guest: guestId,
            purpose: purpose,
        })
        .catch((err) => console.log(err))

        if (response && isLogin()) {
            console.log(response);
        }
    };

    const createGuest = async () => {
        try {
            const result = await authAxios.post("guests", {
                name: name,
                nik: nik,
                email: email,
                address: address,
            });
            console.log("ini response guest: ", result.data.id);
            setGuestId(result.data.id);
            createAppointment();
        } catch (err) {
            console.log("error: ", err);
        }
    };

    const getFilteredHost = (host) => {
        console.log("host terpilih:", host);
        setFilteredHost(host);
        fetchUser();

        if (host !== null) {
            setDisplay(true);
            console.log("filtered host: ", filteredHost);
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

    return (
        <div className="py-24 px-16 grid grid-cols-12">
            <p className="col-span-12 text-4xl mb-10">Create Appointment</p>
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
                    {/* Meeting List Card */}
                    {/* {display && (
                        <div className="flex flex-col border rounded-lg border-gray-200 shadow divide-y divide-gray-100">
                            <div className="flex gap-4 p-4">
                                <div className="h-12 w-12 bg-gray-100 rounded-full flex justify-center items-center">
                                    <p className="text-xs">Image</p>
                                </div>
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
                                                <p>{ getStatusStyle(data.status) }</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )} */}
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
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500 text-center">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>

                        {/* Scan Button */}
                        <div className="flex justify-end">
                            <button
                                className="px-12 py-2 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
                                type="submit"
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
                                onChange={(e) => {
                                    setNik(e.target.value);
                                }}
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
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
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
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                }}
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
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
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
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                onChange={(e) => {
                                    setPurpose(e.target.value);
                                }}
                            />
                        </div>

                        <div className="">
                            <div className="flex flex-row justify-end gap-x-5">
                                <button
                                    className="px-12 py-2 rounded-lg text-sm text-purple-500 font-medium border border-purple-500 focus:outline-none focus:ring transition border-gray-200 hover:bg-purple-200 hover:border-purple-600 hover:text-purple-600 active:bg-gray-200 focus:ring-gray-300"
                                    type="submit"
                                >
                                    Back
                                </button>
                                <button
                                    className="px-12 py-2 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
                                    type="submit"
                                    onClick={() => {
                                        createGuest();
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {display ? (
                <div className="col-start-7 col-span-4 h-auto flex flex-col border rounded-lg border-gray-200 shadow divide-y divide-gray-100">
                    <div className="flex gap-4 p-4">
                        <div className="h-12 w-12 bg-gray-100 rounded-full flex justify-center items-center">
                            {/* <p className="text-xs">Image</p> */}
                            <img alt="host-profile" className="h-12 w-12 rounded-full flex justify-center items-center" src={photo}></img>
                        </div>
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
                                        <p>{ getStatusStyle(data.status) }</p>
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