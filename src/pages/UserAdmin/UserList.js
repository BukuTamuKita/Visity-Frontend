import React, { 
    useState,
    useEffect,
    useMemo 
} from "react";
import axios from "axios";
import { 
    DELETE_USER, 
    JWT_HEADER, 
    SHOW_USERS } from "../../constants/urls";
import Table from "../../components/Table/Table";
import { isLogin } from "../../utils/auth";
import { Link } from "react-router-dom";

export const UserAction = ({ id }) => {
    const authAxios = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            Authorization: `Bearer ${JWT_HEADER}`,
        },
    });

    const deleteUser = () => {
        authAxios.delete(DELETE_USER(id));
    };

    return (
        <>
            <Link
                to={{ pathname: "/user-update", state: id }}
            >
                <button onClick={() => console.log("edit dari userlist")}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </Link>
            <button onClick={() => {
                if (window.confirm("Are you sure want to delete user with id: " + id + " ?")) {
                    deleteUser();
                    window.location.reload();
                }
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </button>
        </>
    )
};

const UserAdmin = () => {
    const [users, setUsers] = useState([]);

    const columns = useMemo(() => 
        [
            {
                Header: "ID",
                accessor: "id",
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
                                { value }
                            </div>
                        )
                    } else {
                        return (
                            <p>{ value }</p>
                        )
                    }
                }
            },
            {
                Header: "Photo",
                accessor: "photo",
                Cell: ({ value }) => {
                    return (
                        <img 
                            alt="profile"
                            src={value}
                            className="w-12" 
                        />
                    )
                },
            }
        ],
        []
    );

    const fetchUsers = async () => {
        const response = await axios.get(SHOW_USERS, {
            headers: { Authorization: `Bearer ${JWT_HEADER}` },
        })
        .catch((err) => console.log(err))

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
        <div className="py-24 px-16">
            <p className="text-4xl mb-10">User List</p>
            <Table 
                columns = {userColumn}
                data={userData}
            />
        </div>
    );
}

export default UserAdmin;