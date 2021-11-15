import React, { 
    useState,
    useEffect,
    useMemo,
} from "react";
import Table from "../../components/Table/Table";
import axios from "axios";
import { SHOW_GUESTS, SHOW_APPOINTMENT } from "../../constants/urls";
import { getToken, isLogin } from "../../utils/auth";

const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
        Authorization: `Bearer ${getToken()}`,
    },
});
const GuestList = ({id}) => {
    const [guests, setGuests] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Host Name",
                accessor: "host.name",
            },
            {
                Header: "Guest Name",
                accessor: "guest.name",
            },
            {
                Header: "Date",
                accessor: "date_time[0]",
            },
            {
                Header: "Time",
                accessor: "date_time[1]",
            },
        ],
        []
    );

    // const fetchGuests = async () => {
    //     const response = await axios.get(SHOW_GUESTS, {
    //         headers: { Authorization: `Bearer ${getToken()}` },
    //     })
    //     .catch((err) => console.log(err))

    //     if (response && isLogin()) {
    //         const guests = response.data;
            
    //         console.log("guests: ", guests);
    //         setGuests(response.data.data);
    //     }
    // };
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
        // fetchGuests();
        fetchAppointments();
    }, []);

    // const guestData = useMemo(() => [...guests], [guests]);
    // const guestColumn = useMemo(() => [...columns], [columns]);
    const appointmentsData = useMemo(() => [...appointments], [appointments]);
    const appointmentsColumn = useMemo(() => [...columns], [columns]);
    return (
        <div className="mx-16 my-24">
            <div className="flex flex-col gap-12">
                <div className="flex flex-col">
                    <p className="text-4xl font-bold text-primary">Guest</p>
                    <p className="">This page is for show all the guest</p>
                </div>
                <Table columns={appointmentsColumn} data={appointmentsData} />
            </div>
        </div>
    );
}

export default GuestList;