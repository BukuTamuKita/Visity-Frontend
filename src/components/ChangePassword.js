import React, { useState } from 'react';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { ReportGmailerrorredRounded } from '@mui/icons-material';
import Popup from '../components/Popup';
import { getToken } from '../utils/auth';
import Notification from './Notification';
import { COLORS } from '../constants/colors';
import { CHANGE_PASSWORD } from '../constants/urls';

const ChangePassword = props => {
    const { data, open, onClose } = props;
    const [newPassword, setNewPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [notify, setNotify] = useState({ 
        isOpen: false, 
        message: '', 
        type: 'success' 
    });
    let attr = {
        title: 'Change Password',
    };

    const handleChangePassword = () => {
        if (newPassword === confirmPass) {
            axios
                .put(CHANGE_PASSWORD(data.id), {
                    password: newPassword,
                }, {
                    headers: { Authorization: `Bearer ${getToken()}` }
                })
                .then(() => {
                    onClose();
                    setNotify({
                        isOpen: true,
                        message: 'Your password has been changed!',
                        type: 'success',
                    });
                })
                .catch(err => {
                    console.log(err);
                    onClose();
                    setNotify({
                        isOpen: true,
                        message: 'Changing password failed!',
                        type: 'error',
                    });
                })
        } else {
            onClose();
            setNotify({
                isOpen: true,
                message: `Password confirmation doesn't match!`,
                type: 'error',
            });
        }
    };

    return (
        <>
            <Popup open={open} onClose={onClose} title={attr.title}>
                <div className="flex flex-row justify-between items-center gap-6 mb-6">
                    <span className="text-lg text-primary font-bold">
                        Change Password
                    </span>
                    <span>
                        <Avatar sx={{ backgroundColor: COLORS.warningShade }}>
                            <ReportGmailerrorredRounded sx={{ color: COLORS.warning }}/>
                        </Avatar>
                    </span>
                </div>
                <div className="mb-6 row-span-2">
                    <label htmlFor="password" className="label">New Pasword</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter new password"
                        className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-500 border-gray-300 rounded-lg placeholder-gray-300"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6 row-span-2">
                    <label htmlFor="confirm" className="label">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm"
                        placeholder="Enter confirm password"
                        className="mt-1 bg-gray-50 focus:ring-primary focus:border-primary block w-full shadow-sm text-sm text-gray-500 border-gray-300 rounded-lg placeholder-gray-300"
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </div>
                <div className="flex flex-row justify-end items-center gap-4">
                    <button className="outline-btn" onClick={onClose}>
                        Close
                    </button>
                    <button className="primary-btn" onClick={handleChangePassword}>
                        Submit
                    </button>
                </div>
            </Popup> 
            <Notification notify={notify} setNotify={setNotify} /> 
        </>
    );
};

export default ChangePassword;