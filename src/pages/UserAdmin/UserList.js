import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { DELETE_USER, SHOW_PHOTO, SHOW_USERS } from "../../constants/urls";
import Table from "../../components/Table/Table";
import { getToken, isLogin } from "../../utils/auth";
import { TrashIcon } from "@heroicons/react/outline";
import { capitalizeFirstLetter } from "../../utils/utility";

export const UserAction = ({ id }) => {
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
            {/* <Link
                to={{ pathname: `/user-update/${id}`, state: id }}
            >
                <button>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            </Link> */}
            <button
                className="p-2 bg-white rounded-full transition duration-300 ease-in-out hover:bg-dangerShade"
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
                <TrashIcon className="w-6 h-6 text-danger" />
            </button>
        </>
    );
};

const UserAdmin = () => {
    const [users, setUsers] = useState([]);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
                show: false,
            },
            {
                Header: "Email",
                accessor: "email",
                show: false,
            },
            {
                Header: "Role",
                accessor: "role",
                Cell: ({ value }) => {
                    // if (value === "admin") {
                    //     return (
                    //         <div>
                    //             <div className="text-blue-500 w-1 h-1 border rounded-2xl bg-blue-100"></div>
                    //             <p>{ value }</p>
                    //         </div>
                    //     )
                    // }
                    return value === "admin" ? (
                        <div className="flex flex-row items-center gap-2">
                            <span className="w-1.5 h-1.5 border rounded-full bg-primary"></span>
                            <p>{capitalizeFirstLetter(value)}</p>
                        </div>
                    ) : (
                        <p>{capitalizeFirstLetter(value)}</p>
                    );
                },
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
                show: false,
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

    useEffect(() => {
        fetchUsers();
    }, []);

    const userData = useMemo(() => [...users], [users]);
    const userColumn = useMemo(() => [...columns], [columns]);

    return (
        <div className="py-16 px-16">
            <div className="flex flex-col mb-12">
                <p className="text-4xl text-primary font-bold mb-2">Users</p>
                <p className="text-lg text-primary">
                    Showing all the users in this app
                </p>
            </div>
            <Table columns={userColumn} data={userData} />
        </div>
    );
};

export default UserAdmin;
