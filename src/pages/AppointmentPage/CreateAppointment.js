import React, { 
  useState,
  useEffect, 
  // useContext, 
  // useCallback 
} from "react";
// import { UserContext } from "../../context/UserContext";
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
import Cookies from "js-cookie";

const AppointmentPage = () => {
  // const { value } = useContext(UserContext);
  // const hostId = value.id;
  const [guestId, setGuestId] = useState();
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");
  const [hosts, setHosts] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [filteredHost, setFilteredHost] = useState("");
  const [display, setDisplay] = useState(false);

  const searchBarAttr = {
    label: "",
    style: "w-full mb-4",
    placeholder: "Search host name",
  };

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: "Bearer " + Cookies.get("JWT"),
    },
  });

  const loadHost = async () => {
    try {
      const result = await authAxios.get("hosts");
      setHosts(result.data.data);
    } catch (err) {
      console.log("error: ", err);
    }
  }

  useEffect(() => {
    loadHost();
  });
  
  // const getHostInformation = async () => {
  //   try {
  //     const res = await authAxios.get(`hosts/${filteredHost.id}/appointments`);
  //     setAppointment(res.data.data);
  //     console.log(appointment);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   getHostInformation();
  // });

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
      addAppointment();
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const addAppointment = async () => {
    try {
      console.log(typeof filteredHost, typeof guestId, purpose);
      const result = await authAxios.post("appointments", {
        host: filteredHost.id,
        guest: guestId,
        purpose: purpose,
      });
      console.log(result);
    } catch (err) {
      console.log("error: ", err);
    }
  };

  const getFilteredHost = (host) => {
    console.log("host terpilih:", host);

    if (host !== null) {
        setFilteredHost(host);
        setDisplay(true);
        console.log("filtered host: ", filteredHost);
    }
  };

  return (
    <div className="py-24 px-16 grid grid-cols-12">
      {/* Section 1 */}
      <div className="col-span-6 divide-y divide-solid divide-gray-300">
        <div className="">
          <p className="text-4xl mb-10">Create Appointment</p>
          <p className="text-2xl mb-4">Who would you like to meet today?</p>
          
          <SearchBar placeholder="Cari nama..." attribute={searchBarAttr} data={hosts} getFilteredHost={getFilteredHost} />
          {/* Meeting List Card */}
          {display && (
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
                <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
                  <p className="text-xl">{filteredHost.name}</p>
                  <p className="text-2lg">{filteredHost.position}</p>
                </div>
                <div className="right-card md:col-span-2 md:mx-2.5 p-4 shadow-sm border border-solid border-current rounded-lg border-gray-300">
                  <p className="text-3xl mb-6">Meeting List</p>
                  {appointment.length !== 0 && appointment.map((data) => {
                      return (
                          <div key={data.id} className="flex justify-between">
                            <p>{data.guest.name}</p>
                            <p>{data.status}</p>
                          </div>
                      );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2 */}
        <div className="">
          {/* Scan KTP Section */}
          <div className="mt-10 mb-6">
            <p className="text-2xl mb-4">Please input your data</p>
            {/* Input KTP File */}
            <label className="text-sm mb-1">Scan KTP</label>
            <div className="w-full h-52 rounded-lg border-2 border-dashed border-gray-300 col-span-4 flex flex-col justify-center items-center mb-6 bg-red-yellow-100">
              <div>
                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
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
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500 text-center">PNG, JPG, GIF up to 10MB</p>
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
              <label htmlFor="nik" className="block text-sm mb-1 font-medium text-gray-600">
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
              <label htmlFor="name" className="block text-sm mb-1 font-medium text-gray-600">
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
              <label htmlFor="address" className="block text-sm mb-1 font-medium text-gray-600">
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
              <label htmlFor="email" className="block text-sm mb-1 font-medium text-gray-600">
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
              <label htmlFor="agenda" className="block text-sm mb-1 font-medium text-gray-600">
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
    </div>
  );
}

export default AppointmentPage;
