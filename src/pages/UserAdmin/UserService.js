import axios from 'axios';
import { getToken } from '../../utils/auth';
import { CREATE_USER, DELETE_USER } from '../../constants/urls';

export const deleteUser = meetingId => {
    axios
        .delete(DELETE_USER(meetingId), {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .catch((err) => console.log(err)) 
};

export const createUser = (formData, setLoading, setNotify) => {
    axios 
        .post(CREATE_USER, formData, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Content-Type': 'application/form-data',
            }
        })
        .then(() => {
            setLoading(false);
            return setNotify({
                isOpen: true,
                message: 'User successfully created!',
                type: 'success',
            });
        }) 
        .catch(err => {
            console.log(err);
            setLoading(false);
            return setNotify({
                isOpen: true,
                message: 'Failed to create user!',
                type: 'error',
            });
        })
};