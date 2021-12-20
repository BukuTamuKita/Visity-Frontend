import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { Status } from '../../components/Status';
import Table from '../../components/Table/Table';
import { SHOW_APPOINTMENT } from '../../constants/urls';

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        {
            id: 'host',
            Header: 'Host Name',
            accessor: (originalRow) => {
                return originalRow.host.name;
            },
        },
        {
            id: 'guest',
            Header: 'Guest Name',
            accessor: (originalRow) => {
                return originalRow.guest.name;
            },
        },
        { Header: 'Purpose', accessor: 'purpose' },
        { Header: 'Note', accessor: 'notes' },
        { Header: 'Date Time', accessor: 'date_time' },
        {
            Header: 'Status',
            accessor: 'status',
            Cell: ({ value }) => {
                return <Status value={value} />;
            },
        },
    ], []);

    useEffect(() => {
        setLoading(true);

        axios
            .get(SHOW_APPOINTMENT, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(res => {
                setAppointments(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            }) 

        return () => {
            setAppointments([]);
        };
    }, []);

    const appointmentsData = useMemo(() => [...appointments], [appointments]);
    const appointmentsColumn = useMemo(() => [...columns], [columns]);

    return (
       <>
            <div className="lg:col-start-2 lg:col-end-12 lg:my-16 z-10 col-span-4 sm:my-12 sm:mx-4 p-4">
                <div className="flex flex-col pb-4">
                    <p className="lg:text-4xl md:text-2xl text-primary font-bold mb-1 text-xl">
                        Appointment History
                    </p>
                    <p className="lg:text-lg text-primary text-sm font-medium">
                        Showing all of the appointments history
                    </p>
                </div>
                <Table
                    columns={appointmentsColumn}
                    data={appointmentsData}
                    loading={loading}
                />
            </div>
        </>
    );
};

export default AppointmentHistory;