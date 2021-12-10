import React, { useState } from 'react';
import axios from 'axios';
import { WarningAmberRounded } from '@mui/icons-material';
import { getToken } from '../../utils/auth';
import { CREATE_USER } from '../../constants/urls';
import { COLORS } from '../../constants/colors';
import UploadIcon from '../../assets/icons/UploadIcon';
import validateForm from '../../utils/validate_form';
// import Notification from '../../components/Notification';

const CreateUser = (props) => {
    const [display, setDisplay] = useState(false);
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [user, setUser] = useState({
        name: '',
        role: 'admin',
        nip: '',
        position: '',
        email: '',
    });
    // const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === 'photo') {
            setImage(e.target.files[0]);
            setUser({ ...user, [name]: image });
            setDisplay(true);
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    // const handleImage = (e) => {
    //     setImage(e.target.files[0]);
    //     setUser({ ...user, photo: image });
    //     setDisplay(true);
    // };

    const handleCreateUser = (e) => {
        e.preventDefault();

        let formData = new FormData();
        console.log(image);
        formData.append('photo', image);

        for (let key in user) {
            formData.append(key, user[key]);
        }

        setErrors(validateForm(formData));

        if (Object.keys(errors).length === 0) {
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
                        props.history.push('/user-list');
                        window.location.reload();
                    })
                    .catch((err) => {
                        console.log(err);
                    })
        }
    };

    const clearInputFile = () => {
        document.getElementById('create-user-form').reset();
    };
    
    return (
        <>
            <div className="p-16 grid grid-cols-12">
                <div className="col-span-6 ">
                    <div className="flex-auto flex-column col-span-12 mb-12">
                        <p className=" text-4xl text-primary font-bold mb-2">
                            Create User
                        </p>
                        <p className="text-lg text-primary">
                            Create an account for new users
                        </p>
                    </div>
                    <div className="rounded-lg p-6 shadow-lg flex-1 bg-white">
                        <p className="text-lg text-gray-700 font-semibold mb-4">User Information</p>
                        <form id="create-user-form">
                            <div className="mb-4">
                                <label htmlFor="name" className="label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your name"
                                    autoComplete="name"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                    // onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    onChange={handleChange}
                                />
                                {errors.name && 
                                    <span className="flex flex-row gap-2 mt-2">
                                        <WarningAmberRounded sx={{ color: COLORS.danger }} />
                                        <p className="text-danger">{ errors.name }</p>
                                    </span> 
                                }
                            </div>
                            <div className="mb-4 col-span-6">
                                <label htmlFor="role" className="label">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    autoComplete="role"
                                    className="mt-1 bg-gray-50 text-gray-700 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-sm"
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
                                                NIP {'/'} ID Number
                                            </label>
                                            <input
                                                type="number"
                                                id="nip"
                                                name="nip"
                                                placeholder="Enter your NIP Number"
                                                autoComplete="nip"
                                                className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                                onChange={handleChange}
                                            />
                                            {errors.nip && 
                                                <span className="flex flex-row gap-2 mt-2">
                                                    <WarningAmberRounded sx={{ color: COLORS.danger }} />
                                                    <p className="text-danger">{ errors.nip }</p>
                                                </span> 
                                            }
                                        </div>
                                        <div className="mb-4 col-span-3">
                                            <label
                                                htmlFor="position" className="label">Position</label>
                                            <input
                                                type="text"
                                                id="position"
                                                name="position"
                                                placeholder="Enter your position"
                                                autoComplete="position"
                                                className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                                onChange={handleChange}
                                            />
                                            {errors.position && 
                                                <span className="flex flex-row gap-2 mt-2">
                                                    <WarningAmberRounded sx={{ color: COLORS.danger }} />
                                                    <p className="text-danger">{ errors.position }</p>
                                                </span> 
                                            }
                                        </div>
                                    </div>
                                )
                            }
                            <div className="mb-4">
                                <label htmlFor="email" className="label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm border-gray-300 rounded-lg placeholder-gray-300"
                                    onChange={handleChange}
                                />
                                {errors.email && 
                                    <span className="flex flex-row gap-2 mt-2">
                                        <WarningAmberRounded sx={{ color: COLORS.danger }} />
                                        <p className="text-danger">{ errors.email }</p>
                                    </span> 
                                }
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                                <div className="mt-1 w-full h-52 rounded-lg border-2 border-dashed border-gray-300 col-span-4 flex flex-col justify-center items-center mb-6 bg-red-yellow-100">
                                    <div>
                                        <UploadIcon />
                                        <div className="flex text-sm text-gray-600 justify-center">
                                            <label
                                                htmlFor="photo"
                                                className="relative cursor-pointer bg-white rounded-lg font-medium text-primary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    id="photo"
                                                    type="file"
                                                    name="photo"
                                                    className="sr-only"
                                                    accept=".jpg, .png, .jpeg"
                                                    onChange={handleChange}
                                                />
                                            </label>
                                        </div>
                                        {
                                            display ? (
                                                <p className="text-xs text-gray-400 text-center">File name: {image.name}</p>
                                            ) : (
                                                <p className="text-xs text-gray-400 text-center">
                                                    PNG, JPG, JPEG up to 2MB
                                                </p>
                                            )
                                        }
                                    </div>
                                </div>
                                {/* {errors.photo === null && <p>{ errors.photo }</p>} */}
                                {errors.photo && 
                                    <span className="flex flex-row gap-2 mt-2">
                                        <WarningAmberRounded sx={{ color: COLORS.danger }} />
                                        <p className="text-danger">{ errors.photo }</p>
                                    </span> 
                                }
                            </div>
                            <div>
                                <div className="flex flex-row justify-end gap-4">
                                    <button 
                                        className="px-4 py-2 text-sm text-gray-400 font-medium hover:bg-primaryOutline border rounded-lg" 
                                        onClick={clearInputFile}
                                    >
                                        Clear Forms
                                    </button>
                                    <button className="primary-btn" onClick={(e) => handleCreateUser(e)}>
                                        Create User
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default CreateUser;