import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DELETE_USER, SHOW_PHOTO, SHOW_USERS,SHOW_APPOINTMENT } from "../../constants/urls";
import Table from "../../components/Table/Table";
import { getToken, isLogin } from "../../utils/auth";
import { Link } from "react-router-dom";

export const UserAction = ({ id }) => {
    const authAxios = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    });
    const deleteUser = () => {
        axios
            .delete(DELETE_USER(id), {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                if (res) {
                    console.log(res);
                    window.location.reload();
                }
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className ="flex flex-row content-center">
                <Link to={{ pathname: `/user-update/${id}`, state: id }}>
                    <button>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 hover:text-green-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                </Link>
                <button
                    onClick={() => {
                        if (
                            window.confirm(
                                "Are you sure want to delete user with id: " +
                                    id +
                                    " ?"
                            )
                        ) {
                            deleteUser();
                        }
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 hover:text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </>
    );
};

const UserAdmin = () => {
    const [users, setUsers] = useState([]);
    const [appointments, setAppointments] = useState([]);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Photo",
                accessor: "photo",
                Cell: ({ value }) => {
                    return (
                        <img
                            alt="profile"
                            src={SHOW_PHOTO(value)}
                            className="w-12 rounded-full"
                        />
                    );
                },
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Role",
                accessor: "role",
                Cell: ({ value }) => {
                    if (value === "admin") {
                        return (
                            <div className="text-xs text-center text-blue-500 font-semibold py-1 px-2 border rounded-2xl bg-blue-100">
                                {value}
                            </div>
                        );
                    } else {
                        return <p>{value}</p>;
                    }
                },
            },
        ],
        []
    );

    const fetchUsers = async () => {
        const response = await axios
            .get(SHOW_USERS, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .catch((err) => console.log(err));

        if (response && isLogin()) {
            const users = response.data;

            console.log("users: ", users);
            setUsers(response.data.data);
        }
    };
    const fetchAppointments = async () => {
        const response = await axios
            .get(SHOW_APPOINTMENT, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .catch((err) => console.log(err));

        if (response && isLogin()) {
            const appointments = response.data;

            console.log("appointments: ", appointments);
            setAppointments(response.data.data);
        }
    };

    useEffect(() => {
        // fetchAppointments();
        fetchUsers();
    }, []);

    const userData = useMemo(() => [...users], [users]);
    const userColumn = useMemo(() => [...columns], [columns]);
    const appointmentsData = useMemo(() => [...appointments], [appointments]);
    const appointmentsColumn = useMemo(() => [...columns], [columns]);

    return (
        <div className="mx-16 my-24">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col">
                    <p className="text-4xl font-bold text-primary">Users</p>
                    <p>This page is for show all the users of visity</p>
                </div>
                <Table columns={userColumn} data={userData} />
            </div>
        </div>
    );
};

export default UserAdmin;
