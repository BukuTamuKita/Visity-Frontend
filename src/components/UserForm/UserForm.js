import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { CREATE_USER } from "../../constants/urls";
import { getToken } from "../../utils/auth";

const UserForm = ({ title }) => {
    const [user, setUser] = useState({});
    const [display, setDisplay] = useState(false);
    const [image, setImage] = useState(null);
    const history = useHistory();

    const handleImage = (e) => {
        setImage(e.target.files[0]);
        setUser({ ...user, photo: image });
        setDisplay(!display);
    };

    const handleCreateUser = () => {
        let formData = new FormData();
        console.log(formData);
        formData.append('photo', image);

        for (let key in user) {
            formData.append(key, user[key]);
        }

        axios 
        .post(CREATE_USER,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/form-data',
                }
            })
            .then(() => {
                history.push("/user-list");
                window.location.reload();
            })
    };

    return (
        <div className="py-24 px-16 grid grid-cols-12">
            <div className="col-span-6">
                <p className="text-4xl mb-10">{ title } User</p>
                {/* User Information */}
                <div>
                    <p className="text-lg font-semibold mb-4">User Information</p>
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
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4 col-span-6">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            id="role"
                            name="role"
                            autoComplete="role"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={(e) => setUser({ ...user, role: e.target.value.toLowerCase() })}
                        >
                            <option>Admin</option>
                            <option>Host</option>
                        </select>
                    </div>
                    {
                        user.role === "host" && (
                            <div className="grid grid-cols-6 gap-6">
                                <div className="mb-4 col-span-3">
                                    <label
                                        htmlFor="nip"
                                        className="block text-sm mb-1 font-medium text-gray-600"
                                    >
                                        NIP
                                    </label>
                                    <input
                                        type="text"
                                        name="nip"
                                        id="nip"
                                        placeholder="Enter your NIP"
                                        autoComplete="nip"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                        onChange={(e) => setUser({ ...user, nip: e.target.value })}
                                    />
                                </div>
                                <div className="mb-4 col-span-3">
                                    <label
                                        htmlFor="position"
                                        className="block text-sm mb-1 font-medium text-gray-600"
                                    >
                                        Position
                                    </label>
                                    <input
                                        type="text"
                                        position="position"
                                        id="position"
                                        placeholder="Enter your position"
                                        autoComplete="position"
                                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                        onChange={(e) => setUser({ ...user, position: e.target.value })}
                                    />
                                </div>
                            </div>
                        )
                    }
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <div className="mt-1 w-full h-52 rounded-lg border-2 border-dashed border-gray-300 col-span-4 flex flex-col justify-center items-center mb-6 bg-red-yellow-100">
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
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => handleImage(e)}
                                        />
                                    </label>
                                </div>
                                {
                                    display ? (
                                        <div>
                                            <p className="text-xs text-gray-500 text-center">File name: {image.name}</p>
                                        </div>
                                    ) : (
                                        <p className="text-xs text-gray-500 text-center">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    )
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Credentials */}
                <div className="">
                    <p className="text-lg font-semibold mb-4">User Credentials</p>
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
                            placeholder="Enter your email"
                            autoComplete="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm mb-1 font-medium text-gray-600"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            autoComplete="password"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="confirm"
                            className="block text-sm mb-1 font-medium text-gray-600"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirm"
                            id="confirm"
                            placeholder="Confirm your password"
                            autoComplete="confirm"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg placeholder-gray-300"
                            onChange={(e) => setUser({ ...user, password_confirmation: e.target.value })}
                        />
                    </div>
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
                                if (title === "Create") {
                                    handleCreateUser();
                                }
                            }}
                        >
                            { title }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserForm;