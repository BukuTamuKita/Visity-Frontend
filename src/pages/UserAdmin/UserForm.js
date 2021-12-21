import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import Popup from '../../components/Popup';
import { createUser } from '../UserAdmin/UserService';
import Notification from '../../components/Notification';

const CreateUser = props => {
    const { fetchUsers } = props;
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });
    const initiateUser = () => {
        return {
            name: '',
            role: 'host',
            nip: '',
            position: '',
            email: '',
        }
    }
    const [user, setUser] = useState(initiateUser());
    
    const handleChange = e => {
        const { name, value } = e.target;
        
        if (name === 'role') {
            setUser({ ...user, [name]: value.toLowerCase() });
        } else {
            setUser({ ...user, [name]: value });
        }
    };

    const handleImage = e => {
        setImage(e.target.files[0]);
        setUser({ ...user, photo: image });
    };

    const clearInputFile = () => {
        setUser(initiateUser());
        document.getElementById('create-user-form').reset();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUser(initiateUser());
    };

    const handleCreateUser = e => {
        e.preventDefault();
        setLoading(true);
        let formData = new FormData();
        formData.append('photo', image);

        for (let key in user) {
            formData.append(key, user[key]);
        }

        createUser(formData, setLoading, setNotify, fetchUsers, handleClose);
    };

    return (
        <>
            <button className="primary-btn" onClick={handleClickOpen}>
                <AddCircleOutlineOutlined />
                Create User
            </button>
            <Popup open={open} onClose={handleClose}>
                <form
                    id="create-user-form"
                    className="flex flex-col gap-y-4"
                    onSubmit={handleCreateUser}
                >
                    <div>
                        <label className="label" htmlFor="name">Name</label>
                        <input
                            required
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="label">Role</label>
                        <select
                            id="role"
                            name="role"
                            onChange={handleChange}
                            className="form-select bg-gray-50 focus:ring-primary focus:border-primary block shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg"
                        >
                            <option value="host">Host</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    {user.role !== "admin" && (
                        <div className="flex md:flex-row flex-col gap-2">
                            <div>
                                <label className="label" htmlFor="nip">NIP / ID Number</label>
                                <input
                                    required
                                    type="number"
                                    id="nip"
                                    name="nip"
                                    placeholder="Enter your NIP"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="label" htmlFor="position">Position</label>
                                <input
                                    required
                                    type="text"
                                    id="position"
                                    name="position"
                                    placeholder="Enter your position"
                                    className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    )}
                    <div>
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            required
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-700 border-gray-300 rounded-lg placeholder-gray-300"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="label" htmlFor="photo">Photo</label>
                        <input
                            required
                            type="file"
                            id="photo"
                            name="photo"
                            accept=".jpg, .png, .jpeg"
                            onChange={handleImage}
                        />
                    </div>
                    <div className="flex flex-row justify-end gap-4">
                        <button
                            className="px-4 py-2 text-sm text-gray-500 font-medium hover:bg-primaryOutline border rounded-lg"
                            onClick={clearInputFile}
                        >
                            Clear
                        </button>
                        <button className="secondary-btn font-semibold" type="submit">
                        {loading ? (
                            <span className="flex justifty-center items-center">
                                <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                            </span>
                        ) : (
                            <span>Create User</span>
                        )}
                        </button>
                    </div>
                </form>
            </Popup>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

export default CreateUser;