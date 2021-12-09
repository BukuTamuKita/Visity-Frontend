import React, { 
    useState, 
    useEffect,
    useMemo, 
} from 'react';
import axios from 'axios';
import { 
    UPDATE_APPOINTMENT, 
    SHOW_APPOINTMENT,
    // DELETE_APPOINTMENT, 
} from '../../constants/urls';
import { Status } from '../../components/Status';
import Table from '../../components/Table/Table';
import { getToken, isLogin } from '../../utils/auth';
import { XCircleIcon } from '@heroicons/react/outline';

export const AppointmentAction = ({ id }) => {
    const cancelAppointment = (note) => {
        axios
            .put(UPDATE_APPOINTMENT(id), {
                status: "canceled",
                notes: note,
            }, 
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                if (res) {
                    console.log("cancel res: ", res);
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
    };

    // const deleteAppointment = () => {
    //     axios
    //         .delete(DELETE_APPOINTMENT(id), {
    //             headers: { Authorization: `Bearer ${getToken()}` },
    //         })
    //         .then((res) => {
    //             if (res) {
    //                 console.log("delete res: ", res);
    //                 window.location.reload();
    //             }
    //         })
    //         .catch((err) => console.log(err))
    // };

    return (
        <>
            <button 
                onClick={() => {
                    let value;
                    let notes = window.prompt("Enter your notes: ", value);

                    if (notes !== null) {
                    cancelAppointment(notes);
                    }
                }}
                className="flex flex-row items-center gap-2 px-12 py-3.5 rounded-lg text-sm font-medium border-0 focus:outline-none focus:ring transition text-yellow-500 bg-yellow-50 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300"
            >
                <XCircleIcon className="w-8" />
                Cancel Appointment
            </button>
            {/* <button onClick={() => {
                if (window.confirm("Are you sure want to delete id: " + id + " ?")) {
                deleteAppointment();
                }
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button> */}
        </>
    )
};

const AppointmentHistory = () => {
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
            Header: "Purpose",
            accessor: "purpose",
        },
        {
            Header: "Note",
            accessor: "notes",
        },
        // {
        //     Header: "Date",
        //     accessor: "date_time[0]",
        // },
        // {
        //     Header: "Time",
        //     accessor: "date_time[1]",
        // },
        {
            Header: "Date Time",
            accessor: "date_time",
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: ({ value }) => {
                return (
                    <Status value={value} />
                );
            },
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

    const appointmentsData = useMemo(() => [...appointments], [appointments]);
    const appointmentsColumn = useMemo(() => [...columns], [columns]);

    return (
        <div className="py-24 px-16">
            <p className="text-4xl mb-10">Appointment History</p>
            <Table 
                columns={appointmentsColumn} 
                data={appointmentsData}
            />
        </div>
    );
}

export default AppointmentHistory;
