import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import SearchBar from "../../components/SearchBar/SearchBar";
// import Button from "../../components/Button";

const SearchUser = () => {
    const [hosts, setHosts] = useState();
    const [filteredHost, setFilteredHost] = useState({});
    const [appointment, setAppointment] = useState([]);
    // const continueBtn = {
    //     title: "Testing",
    // };

    // const authAxios = axios.create({
    //     baseURL: "http://127.0.0.1:8000/api",
    //     headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //     },
    // });
    // 
    // const fetchDataHosts = useCallback(async () =>{
    //     try {
    //         const result = await authAxios.get(`http://127.0.0.1:8000/api/hosts`);
    //         // setHosts(result.data.data);
    //         console.log("dari fetchdatahosts: \n", result);
    //     } catch(err){
    //         console.log("error");
    //     }
    // });
    //

    useEffect(() => {
        // fetchDataHosts();
        // fetchDataHost();
        axios
        .get('http://127.0.0.1:8000/api/hosts', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => {
            console.log(res.data.data);
            setHosts(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const getHostFromSearchBar = (host) => {
        getHostInformation(host);
    };

    const searchAPI = () => {
        axios
        .get('http://127.0.0.1:8000/api/hosts', {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => {
            console.log("searchAPI: ", res.data.data);
            setHosts(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    const getHostInformation = (host) => {
        axios
        .get(`http://127.0.0.1:8000/api/hosts/${host.id}/appointments`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
        .then(res => {
            console.log("getHostInformation: ", res.data.data);
            setAppointment(res.data.data);
            setFilteredHost(host);
            console.log("filteredHost: ", filteredHost);
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div>
            <SearchBar placeholder="Cari nama..." data={hosts} setFilteredHost={getHostFromSearchBar}/>

            <div className="flex flex-col items-center justify-center">
                <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
                    <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
                        <p className="text-xl">{ filteredHost.name }</p>
                        <p className="text-2lg">{ filteredHost.position }</p>
                    </div>
                    <div className="right-card md:col-span-2 md:mx-2.5 p-4 shadow-sm border border-solid border-current rounded-lg border-gray-300">
                        <p className="text-3xl mb-6">Meeting List</p>
                        {appointment.length !== 0 &&
                            appointment.map((value) => {
                                return (
                                    <div 
                                        key={value.id}
                                        className="flex justify-between"
                                    >
                                        <p>{ value.guest.name }</p>
                                        <p>{value.status}</p>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className="mt-8 rounded text-center">
                    <Link 
                        className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300" 
                        to="/appointment"
                    >
                        Continue
                    </Link>
                    {/* <Button title={continueBtn.title} action={searchAPI} /> */}
                </div>
            </div>
        </div>
    );
};

export default SearchUser;