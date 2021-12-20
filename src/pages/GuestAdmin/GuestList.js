import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import Table from '../../components/Table/Table';
import { SHOW_APPOINTMENT } from '../../constants/urls';
import Notification from '../../components/Notification';

const GuestAdmin = () => {
    const [waiting, setWaiting] = useState([]);
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState([]);
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'success' });

    const columns = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        {
            id: 'host',
            Header: 'Host Name',
            accessor: (originalRow) => {
                return originalRow.host.name;
            }
        },
        {
            id: 'guest',
            Header: 'Guest Name',
            accessor: (originalRow) => {
                return originalRow.guest.name;
            }
        },
        { Header: 'Status', accessor: 'status' },
        { Header: 'Purpose', accessor: 'purpose' },
        { Header: 'Notes', accessor: 'notes' },
        { Header: 'Date Time', accessor: 'date_time' },
    ], []);

    const filterWaitingStatus = response => {
        setWaiting(response.filter((data) => data.status === 'waiting'));
    };

    const fetchAppointments = () => {
        axios
            .get(SHOW_APPOINTMENT, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(res => {
                filterWaitingStatus(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            }) 
    };

    useEffect(() => {
        setLoading(true);
        fetchAppointments();

        return () => {
            setAppointments([]);
        } 
    }, []);

    const guestData = useMemo(() => [...waiting], [waiting]);
    const guestColumn = useMemo(() => [...columns], [columns]);

    return (
        <>
            <div className="lg:col-start-2 lg:col-end-12 lg:my-16 z-10 col-span-4 sm:my-12 sm:mx-4 p-4">
                <div className="flex flex-col mb-6">
                    <p className="lg:text-4xl text-primary font-bold mb-1 text-2xl">
                        Guest
                    </p>
                    <p className="lg:text-lg text-primary text-sm font-medium">
                        Showing all the guest and the host they appointed
                    </p>
                </div>
                <Table
                    columns={guestColumn}
                    data={guestData}
                    loading={loading}
                    fetchAppointments={fetchAppointments}
                    information={appointments}
                />
            </div>
            <Notification notify={notify} setNotify={setNotify} />
        </>
    );
};

export default GuestAdmin;