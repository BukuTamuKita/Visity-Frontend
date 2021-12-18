import axios from 'axios';
import { capitalizeFirstLetter } from '../../utils/utility';
import { api, CREATE_GUEST, CREATE_APPOINTMENT, SEND_NOTIFICATION } from '../../constants/urls';

export const createGuest = (guestInfo, newAppointment, filteredHost) => {
    api
        .post(CREATE_GUEST, {
            name: capitalizeFirstLetter(guestInfo.name),
            nik: capitalizeFirstLetter(guestInfo.nik),
            address: capitalizeFirstLetter(guestInfo.address),
            email: newAppointment.email,
        })
        .then(res => {
            newAppointment.guestId = res.data.id;
            createAppointment(filteredHost, newAppointment.guestId, newAppointment);
        })
        .catch(err => console.log(err))
};

export const createAppointment = (filteredHost, guestId, newAppointment) => {
    api
        .post(CREATE_APPOINTMENT, {
            host: filteredHost.id,
            guest: guestId,
            purpose: newAppointment.purpose,
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