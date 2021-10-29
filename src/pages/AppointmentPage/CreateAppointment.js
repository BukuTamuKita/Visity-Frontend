import React, { 
  // useContext, 
  useState, 
  // useCallback 
} from 'react'
// import { UserContext } from "../../context/UserContext";
import axios from 'axios';

const AppointmentPage = () => {
  // const { value } = useContext(UserContext);
  // const hostId = value.id;
  const [guestId, setGuestId] = useState();
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [purpose, setPurpose] = useState("");

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

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
      console.log("error");
    }
  };

  const addAppointment = async () => {
    try {
      console.log(typeof hostId, typeof guestId, purpose);
      const result = await authAxios.post("appointments", {
        // host: hostId,
        guest: guestId,
        purpose: purpose,
      });
      console.log(result);
    } catch (err) {
      console.log("error");
    }
  };

  return (

    // Container 1
    <div className="flex justify-center items-center mt-16">
      {/* Container 2 */}
      <div className="grid grid-cols-12 gap-8">

        {/* Left Section */}
        <div className="col-span-6">
          <div className="h-80 rounded-lg border-4 border-dashed border-gray-300 col-span-4 flex flex-col justify-center items-center mb-8">
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
          {/* Button Scan */}
          <div className="grid grid-cols-6 text-center">
            <div className="col-span-2"></div>
            <button
              className="col-span-2 mx-auto w-full px-4 py-2 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
              type="submit"
            >
              Scan
            </button>
            <div className="col-span-2"></div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-span-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="">
              <label
                htmlFor="nik"
                className="block text-sm font-medium text-gray-600"
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
                onChange={e => {
                  setNik(e.target.value);
                }}
              />
            </div>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
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
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-600"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Enter your NIK"
              autoComplete="address"
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
              onChange={e => {
                setAddress(e.target.value);
              }}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
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
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>

          <div className="mb-8 row-span-2">
            <label
              htmlFor="agenda"
              className="block text-sm font-medium text-gray-600"
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
              onChange={e => {
                setPurpose(e.target.value);
              }}
            />
          </div>
          
          <div className="col-span-6">
            <div className="grid grid-cols-6 gap-4">
              <button
                className="col-span-2 w-full px-4 py-2 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
                type="submit"
                onClick={() => {
                  createGuest();
                }}
              >
                Submit
              </button>
              <button
                className="col-span-2 w-full px-4 py-2 rounded-lg text-sm text-purple-500 font-medium border border-purple-500 focus:outline-none focus:ring transition border-gray-200 hover:bg-purple-200 hover:border-purple-600 hover:text-purple-600 active:bg-gray-200 focus:ring-gray-300"
                type="submit"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentPage;
