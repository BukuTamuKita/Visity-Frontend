import React, { useContext, useState, useCallback } from 'react'
import { UserContext } from "../../context/UserContext";
import axios from 'axios';

const AppointmentPage = () => {
  const { value } = useContext(UserContext);
  const hostId = value.id;
  const [guestId, setGuestId] = useState();

  // Guest
  const [name, setName] = useState("");
  const [nik, setNik] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  
  // Appointment
  const [purpose, setPurpose] = useState("");

  // const guest = {
  //   name: "",
  //   nik: "",
  //   email: "",
  //   address: "",
  // };
  // const appointment = {
  //   hostId,
  //   guestId,
  //   purpose: "",
  // }

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const createGuest = useCallback(async () => {
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
  });

  const addAppointment = useCallback(async () => {
    try {
      console.log(typeof hostId, typeof guestId, purpose);
      const result = await authAxios.post("appointments", {
        host: hostId,
        guest: guestId,
        purpose: purpose,
      });
      console.log(result);
    } catch (err) {
      console.log("error");
    }
  });

  return (
    <div className=" min-h-screen flex justify-center ">
      <div className="flex-1 mx-auto grid grid-cols-2 ml-64 mr-64">
        <div className="grid gap-2 mt-5  grid-cols-2 justify-center">
          <div className="rounded-lg border-4 border-dashed col-span-4 flex flex-col justify-center items-center">
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
                  className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
          <div className="col-span-4 text-center">
            <button
              className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
              type="submit"
            >
              Capture
            </button>
          </div>
        </div>
        <div className="col-start-2 px-7">
          <div className="grid grid-column-2">
            <div className="bg-white p-3 rounded lg:col-span-1 sm:col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                NIK
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={e => {
                  setNik(e.target.value);
                }}
              />
            </div>
            <div className="bg-white p-3 rounded lg:col-span-1 sm:col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Nama
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="bg-white p-3 rounded col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={e => {
                  setAddress(e.target.value);
                }}
              />
            </div>
            <div className="p-3 rounded col-span-2">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={e => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="p-3 col-span-2 row-span-2 ">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                Keperluan
              </label>
              <textarea
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                onChange={e => {
                  setPurpose(e.target.value);
                }}
              />
            </div>

            <div className="bg-white p-3 rounded text-right">
              <button
                className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-300"
                type="submit"
              >
                Back
              </button>
            </div>
            <div className="bg-white p-3 rounded text-left">
              <button
                className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
                type="submit"
                onClick={() => {
                  createGuest();
                  // addAppointment();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentPage;