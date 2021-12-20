import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { SHOW_USERS } from '../../constants/urls';
import Table from '../../components/Table/Table';
import { capitalizeFirstLetter } from '../../utils/utility';

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = useMemo(() => [
        { Header: 'ID', accessor: 'id' },
        { Header: 'Name', accessor: 'name' },
        { Header: 'Email', accessor: 'email' },
        {
            Header: 'Role',
            accessor: 'role',
            Cell: ({ value }) => {
                return value === 'admin' ? (
                    <div className="flex flex-row items-center gap-2">
                        <span className="w-1.5 h-1.5 border rounded-full bg-primary"></span>
                        <p>{capitalizeFirstLetter(value)}</p>
                    </div>
                ) : (
                    <p>{capitalizeFirstLetter(value)}</p>
                );
            },
        },
        { Header: 'Photo', accessor: 'photo' },
    ], []);

    const fetchUsers = () => {
        axios
            .get(SHOW_USERS, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(res => {
                setUsers(res.data.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    };

    useEffect(() => {
        setLoading(true);
        fetchUsers();

        return () => {
            setUsers([]);
        };
    }, []);

    const userData = useMemo(() => [...users], [users]);
    const userColumn = useMemo(() => [...columns], [columns]);

    return (
        <>
            <div className="lg:col-start-2 lg:col-end-12 lg:my-16 z-10 col-span-4 sm:my-12 sm:mx-4 p-4">
                <div className="flex flex-col pb-4">
                    <p className="lg:text-4xl text-primary font-bold mb-2 text-2xl">
                        Users
                    </p>
                    <p className="lg:text-lg text-primary text-sm">
                        Showing all the users in this app
                    </p>
                </div>
                <Table
                    columns={userColumn}
                    data={userData}
                    loading={loading}
                    fetchUsers={fetchUsers}
                />
            </div>
        </>
    );
};

export default UserAdmin;