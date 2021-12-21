import axios from 'axios';
import { capitalizeFirstLetter } from '../../utils/utility';
import { 
    api,
    CREATE_GUEST,
    CREATE_APPOINTMENT,
    SEND_NOTIFICATION,
} from '../../constants/urls';
 
export const createGuest = (guestInfo, newAppointment, filteredHost, setLoading, setNotify) => {
    setLoading(true);

    api
        .post(CREATE_GUEST, {
            name: capitalizeFirstLetter(guestInfo.name),
            nik: capitalizeFirstLetter(guestInfo.nik),
            address: capitalizeFirstLetter(guestInfo.address),
            email: newAppointment.email,
        })
        .then(res => {
            newAppointment.guestId = res.data.id;
            createAppointment(
                filteredHost,
                newAppointment.guestId,
                newAppointment,
                setNotify
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

export const createAppointment = (filteredHost, guestId, newAppointment, setNotify) => {
    api
        .post(CREATE_APPOINTMENT, {
            host: filteredHost.id,
            guest: guestId,
            purpose: newAppointment.purpose,
        })
        .then(() => {
            if (filteredHost.name !== '') {
                sendNotification(filteredHost, newAppointment, setNotify);
            }
        })
        .catch(err => {
            console.log(err);
            return setNotify({
                isOpen: true,
                message: 'Failed to create appointment data!',
                type: 'error',
            });
        }) 
};

export const sendNotification = (filteredHost, newAppointment, setNotify) => {
    axios
        .post(SEND_NOTIFICATION, {
            name: filteredHost.name,
            gname: capitalizeFirstLetter(newAppointment.name),
            body: newAppointment.purpose,
        })
        .catch(err => {
            console.log(err);
            return setNotify({
                isOpen: true,
                message: 'Failed to send notification!',
                type: 'error',
            });
        }) 
};