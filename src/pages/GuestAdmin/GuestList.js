import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import Table from '../../components/Table/Table';
import { SHOW_APPOINTMENT, UPDATE_APPOINTMENT } from '../../constants/urls';

const GuestList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = useMemo(() => [
        {
            Header: "ID",
            accessor: "id",
        },
        {
            id: "host",
            Header: "Host Name",
            accessor: (originalRow) => {
                return originalRow.host.name;
            }
        },
        {
            id: "guest",
            Header: "Guest Name",
            accessor: (originalRow) => {
                return originalRow.guest.name;
            }
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
    ], []);

    useEffect(() => {
        setLoading(true);
        axios
            .get(SHOW_APPOINTMENT, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setAppointments(res.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err))

        return () => {
            setAppointments([]);
        } 
    }, []);

    const guestData = useMemo(() => [...appointments], [appointments]);
    const guestColumn = useMemo(() => [...columns], [columns]);

    const cancelAppointment = (note, meetingId) => {
        setLoading(true);
        axios
            .put(UPDATE_APPOINTMENT(meetingId), {
                status: "canceled",
                notes: note,
            }, 
            {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(() => {
                window.location.reload();
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            }) 
    };

    return (
        <div className="p-16">
            <div className="flex flex-col mb-12">
                <p className="text-4xl text-primary font-bold mb-2">Guest</p>
                <p className="text-lg text-primary">Showing all the guest and the host they appointed</p>
            </div>
            <Table
                columns={guestColumn}
                data={guestData}
                loading={loading}
                action={cancelAppointment}
            />
        </div>
    );
}

export default GuestList;