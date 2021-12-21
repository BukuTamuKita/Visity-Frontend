import axios from 'axios';
import { capitalizeFirstLetter } from '../../utils/utility';
import {
    CREATE_GUEST,
    CREATE_APPOINTMENT,
    SEND_NOTIFICATION,
} from '../../constants/urls';
import { getToken } from '../../utils/auth';
 
export const createGuest = (guestInfo, newAppointment, filteredHost, setLoading, setNotify) => {
    setLoading(true);

    axios
        .post(CREATE_GUEST, {
            name: capitalizeFirstLetter(guestInfo.name),
            nik: capitalizeFirstLetter(guestInfo.nik),
            address: capitalizeFirstLetter(guestInfo.address),
            email: newAppointment.email,
        }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
        .then(res => {
            newAppointment.guestId = res.data.id;
            createAppointment(
                filteredHost,
                newAppointment.guestId,
                newAppointment,
            );
            setLoading(false);
            return setNotify({
                isOpen: true,
                message: 'Appointment successfully created!',
                type: 'success',
            });
        })
        .catch(err => {
            console.log(err);
            setLoading(false);
            return setNotify({
                isOpen: true,
                message: 'Failed to create appointment!',
                type: 'error',
            });
        });
};

export const createAppointment = (filteredHost, guestId, newAppointment) => {
    axios
        .post(CREATE_APPOINTMENT, {
            host: filteredHost.id,
            guest: guestId,
            purpose: newAppointment.purpose,
        }, {
            headers: { Authorization: `Bearer ${getToken()}` }
        })
        .then(() => {
            if (filteredHost.name !== '') {
                sendNotification(filteredHost, newAppointment);
            }
        })
        .catch(err => console.log(err)) 
};

export const sendNotification = (filteredHost, newAppointment) => {
    axios
        .post(SEND_NOTIFICATION, {
            name: filteredHost.name,
            gname: capitalizeFirstLetter(newAppointment.name),
            body: newAppointment.purpose,
        })
        .catch(err => console.log(err)) 
};