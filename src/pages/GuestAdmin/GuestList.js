import React, { useState, useEffect, useMemo } from "react";
import Table from "../../components/Table/Table";
import axios from "axios";
import { SHOW_GUESTS } from "../../constants/urls";
import { getToken, isLogin } from "../../utils/auth";

const GuestList = () => {
    const [guests, setGuests] = useState([]);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "NIK",
                accessor: "nik",
            },
            {
                Header: "Address",
                accessor: "address",
            },
            {
                Header: "Email",
                accessor: "email",
            },
        ],
        []
    );

    const fetchGuests = async () => {
        const response = await axios
            .get(SHOW_GUESTS, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .catch((err) => console.log(err));

        if (response && isLogin()) {
            const guests = response.data;

            console.log("guests: ", guests);
            setGuests(response.data.data);
        }
    };

    useEffect(() => {
        fetchGuests();
    }, []);

    const guestData = useMemo(() => [...guests], [guests]);
    const guestColumn = useMemo(() => [...columns], [columns]);

    return (
        <div className="py-24 px-16">
            <p className="text-4xl mb-10">Guest List</p>
            <Table columns={guestColumn} data={guestData} />
        </div>
    );
};

export default GuestList;
