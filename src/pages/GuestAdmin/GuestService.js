import axios from 'axios';
import { getToken } from '../../utils/auth';
import { UPDATE_APPOINTMENT } from '../../constants/urls';

export const cancelAppointment = (note, meetingId, setNotify) => {
    axios
        .put(UPDATE_APPOINTMENT(meetingId), {
            status: "canceled",
            notes: note,
        }, 
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .then(res => {
            console.log(res);
            return setNotify({
                isOpen: true,
                message: 'Appointment canceled!',
                type: 'success',
            });
        })
        .catch(err => {
            console.log(err);
            return setNotify({
                isOpen: true,
                message: 'Failed to cancel appointment!',
                type: 'error',
            });
        }) 
};