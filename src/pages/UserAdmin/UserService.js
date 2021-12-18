import axios from 'axios';
import { getToken } from '../../utils/auth';
import { DELETE_USER } from '../../constants/urls';

export const deleteUser = meetingId => {
    axios
        .delete(DELETE_USER(meetingId), {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .catch((err) => console.log(err)) 
};