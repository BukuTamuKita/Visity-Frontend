import axios from 'axios';
import { getToken } from '../../utils/auth';
import { CREATE_USER, DELETE_USER } from '../../constants/urls';

export const deleteUser = (meetingId, setNotify) => {
    axios
        .delete(DELETE_USER(meetingId), {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then(() => {
            return setNotify({
                isOpen: true,
                message: `Users with ID ${meetingId} successfully deleted!`,
                type: 'success',
            });
        })
        .catch(err => {
            console.log(err);
            return setNotify({
                isOpen: true,
                message: `Failed to delete user!`,
                type: 'error',
            });
        })
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