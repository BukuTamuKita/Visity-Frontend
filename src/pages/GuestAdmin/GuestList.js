import React, { 
    useState,
    useEffect,
    useMemo,
} from 'react';
import Table from '../../components/Table/Table';
import axios from 'axios';
import { 
    SHOW_APPOINTMENT, 
    // UPDATE_APPOINTMENT, 
} from '../../constants/urls';
import { getToken, isLogin } from '../../utils/auth';
import { XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import Popup from '../../components/Popup/Popup';

// const CancelPopup = () => {
//     return (
//         <Popup attribute={} />
//     );
// };

export const GuestAction = ({ id }) => {
    const dialogAttr = {
        title: 'Cancel meeting',
    };

    // const cancelAppointment = (note) => {
    //     axios
    //         .put(UPDATE_APPOINTMENT(id), {
    //             status: "canceled",
    //             notes: note,
    //         }, 
    //         {
    //             headers: { Authorization: `Bearer ${getToken()}` },
    //         })
    //         .then((res) => {
    //             if (res) {
    //                 console.log("cancel res: ", res);
    //                 window.location.reload();
    //             }
    //         })
    //         .catch((err) => console.log(err));
    // };

//     const fetchUsers = () => {
// 		axios
// 			.get(SHOW_USERS, {
// 				headers: { Authorization: `Bearer ${getToken()}` },
// 			})
// 			.then((res) => {
// 				setUsers(res.data.data);
// 			})
// 			.catch((err) => console.log(err));
// 	};
// 
//     useEffect(() => {
//         fetchUsers();
//     }, []);

    return (
        <>
            {/* <button 
                onClick={() => {
                    let value;
                    let notes = window.prompt("Enter your notes: ", value);

                    if (notes !== null) {
                    cancelAppointment(notes);
                    }
                }}
                className="flex flex-row items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-yellow-500 bg-yellow-50 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
            >
                <XCircleIcon className="w-8" />
                Cancel Appointment
            </button> */}
            <Popup attribute={dialogAttr} icon={<XCircleIcon className="w-6 h-6" />}>
                <div className="p-6">
                    <div>
                        <p>Are you sure want to cancel appointment?</p>
                        <div>
                            <ExclamationCircleIcon className="w-6 h-6" />
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    );
};

const GuestList = () => {
    const [appointments, setAppointments] = useState([]);

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            Header: "Host Name",
            accessor: "host",
        },
        {
            Header: "Guest Name",
            accessor: "guest",
        },
        {
            Header: "Status",
            accessor: "status",
        },
        {
            Header: "Purpose",
            accessor: "purpose",
        },
        {
            Header: "Notes",
            accessor: "notes",
        },
        {
            Header: "Date Time",
            accessor: "date_time",
        },
    ], []
    );

    const fetchAppointments = async () => {
        const response = await axios.get(SHOW_APPOINTMENT, {
            headers: { Authorization: `Bearer ${getToken()}` },
        })
        .catch((err) => console.log(err))

        if (response && isLogin()) {
            const appointments = response.data;

            console.log("appointments: ", appointments);
            setAppointments(response.data.data); 
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const guestData = useMemo(() => [...appointments], [appointments]);
    const guestColumn = useMemo(() => [...columns], [columns]);

    return (
        <div className="p-16">
            <div className="flex flex-col mb-12">
                <p className="text-4xl text-primary font-bold mb-2">Guest</p>
                <p className="text-lg text-primary">Showing all the guest and the host they appointed</p>
            </div>
            <Table
                columns={guestColumn}
                data={guestData}
            />
        </div>
    );
}

export default GuestList;