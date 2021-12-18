import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { getToken } from "../../utils/auth";
import { Status } from "../../components/Status";
import Table from "../../components/Table/Table";
import { SHOW_APPOINTMENT } from "../../constants/urls";

const AppointmentHistory = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const columns = useMemo(() => [
        { Header: "ID", accessor: "id" },
        {
            id: "host",
            Header: "Host Name",
            accessor: (originalRow) => {
                return originalRow.host.name;
            },
        },
        {
            id: "guest",
            Header: "Guest Name",
            accessor: (originalRow) => {
                return originalRow.guest.name;
            },
        },
        { Header: "Purpose", accessor: "purpose" },
        { Header: "Note", accessor: "notes" },
        { Header: "Date Time", accessor: "date_time" },
        {
            Header: "Status",
            accessor: "status",
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
        <div className="grid grid-cols-12">
            <div className="fixed -z-10">
                <svg
                    width="208"
                    height="158"
                    viewBox="0 0 208 158"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M-112.244 -401.254C-40.3804 -400.552 30.5669 -467.057 95.2391 -435.713C160.246 -404.208 180.566 -321.041 197.942 -250.923C214.318 -184.837 207.071 -117.816 190.373 -51.8108C172.528 18.7327 160.851 102.303 98.9217 140.508C37.4905 178.404 -40.4496 142.324 -112.244 134.874C-175.093 128.352 -239.98 132.858 -293.8 99.7528C-350.318 64.9878 -389.52 9.46002 -415.437 -51.6237C-443.346 -117.401 -462.416 -189.023 -445.811 -258.52C-428.411 -331.346 -391.533 -410.34 -322.694 -439.796C-255.483 -468.556 -185.346 -401.968 -112.244 -401.254Z"
                        fill="#E7EAF5"
                    />
                </svg>
            </div>
            <div className="fixed bottom-0 -right-10 -z-10">
                <svg
                    width="384"
                    height="605"
                    viewBox="0 0 384 605"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M339.756 45.7464C411.62 46.4484 482.567 -20.0565 547.239 11.2867C612.246 42.792 632.566 125.959 649.942 196.077C666.318 262.163 659.071 329.184 642.373 395.189C624.528 465.733 612.851 549.303 550.922 587.508C489.491 625.404 411.55 589.324 339.756 581.874C276.907 575.352 212.02 579.858 158.2 546.753C101.682 511.988 62.4798 456.46 36.5626 395.376C8.65395 329.599 -10.4156 257.977 6.18894 188.48C23.589 115.654 60.4674 36.6604 129.306 7.204C196.517 -21.5557 266.654 45.0323 339.756 45.7464Z"
                        fill="#E7EAF5"
                    />
                </svg>
            </div>
            <div className="col-start-2 col-end-12 my-16 z-10">
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
        </div>
    );
};

export default AppointmentHistory;