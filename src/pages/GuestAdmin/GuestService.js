import axios from 'axios';
import { getToken } from '../../utils/auth';
import { UPDATE_APPOINTMENT } from '../../constants/urls';

export const cancelAppointment = (note, meetingId) => {
    axios
        .put(UPDATE_APPOINTMENT(meetingId), {
            status: "canceled",
            notes: note,
        }, 
        {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .catch((err) => console.log(err)) 
};