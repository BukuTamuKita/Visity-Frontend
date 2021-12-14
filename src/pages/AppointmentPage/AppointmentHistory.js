import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { SHOW_APPOINTMENT } from '../../constants/urls';
import { Status } from '../../components/Status';
import Table from '../../components/Table/Table';
import { getToken } from '../../utils/auth';

const AppointmentHistory = () => {
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
            accessor: originalRow => {
                return originalRow.host.name;
            }
        },
        {
            id: "guest",
            Header: "Guest Name",
            accessor: originalRow => {
                return originalRow.guest.name;
            }
        },
        {
            Header: "Purpose",
            accessor: "purpose",
        },
        {
            Header: "Note",
            accessor: "notes",
        },
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

    const appointmentsData = useMemo(() => [...appointments], [appointments]);
    const appointmentsColumn = useMemo(() => [...columns], [columns]);

    return (
        <div className="p-16">
            <div className="flex-auto flex-column col-span-12 mb-12">
                <p className="text-4xl text-primary font-bold mb-2">
                    Appointment History
                </p>
                <p className="text-lg text-primary">
                    Showing all of the appointments history
                </p>
            </div>
            <Table 
                columns={appointmentsColumn} 
                data={appointmentsData}
                loading={loading}
            />
        </div>
    );
}

export default AppointmentHistory;