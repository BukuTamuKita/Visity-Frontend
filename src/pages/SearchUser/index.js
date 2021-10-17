import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import { Link } from 'react-router-dom';
// import Button from "../../components/Button";


const SearchUser = () => {
    const [hosts, setHosts] = useState([]);
    const [filteredHost, setFilteredHost] = useState({});
    const [appointment, setAppointment] = useState([]);
    // const continueBtn = {
    //     title: "Continue",
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

    // const fetchDataHost = useCallback(async () =>{
    //     try {
    //         const result = await authAxios.get(`http://127.0.0.1:8000/api/hosts/${filteredHost.id}/appointments`);
    //         // setHosts(result.data.data);
    //         console.log("ini dari fetchdatahost: \n", typeof result);
    //     } catch(err){
    //         console.log("error");
    //     }
    // });

    useEffect(() => {
        // fetchDataHosts();
        // fetchDataHost();
        searchAPI();
        // getHostInformation();
    }, []);

    const getHostFromSearchBar = (host) => {
        console.log("host \n", host);
        // setFilteredHost(host);
        // console.log(filteredHost);
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
            console.log(res.data.data);
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
            // console.log(res);
            // console.log("id: ", res.data.data[0].host.id);

            if (host.id === res.data.data[0].host.id) {
                setFilteredHost(res.data.data[0].host);
                setAppointment(res.data.data);
                console.log("ini host terpilih: \n", filteredHost);
                console.log(appointment);
                // console.log(res);
            } else {
                console.log("gagal");
            }
        })
        .catch(err => {
            console.log(err);
        });
        
        
    }

    return (
        <div className="ml-48 pt-40">
            <SearchBar placeholder="Cari nama..." data={hosts} setFilteredHost={getHostFromSearchBar}/>

            <div className="flex flex-col items-center justify-center">
                <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
                    <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
                        <p className="text-xl">{ filteredHost.name }</p>
                        <p className="text-2lg">{ filteredHost.position }</p>
                    </div>
                    <div className="right-card md:col-span-2 md:mx-2.5 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300">
                        <p className="text-3xl">Meeting List</p>
                        <ul>
                            {/* <li>{ appointment[0].guest.name }</li>
                            <li>{ appointment[0].status }</li> */}
                        </ul>
                    </div>
                </div>
                <div className="mt-8 rounded text-center">
                    <Link 
                        className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300" 
                        to={{
                            pathname:"/appointment",
                            state: hosts
                        }}
                    >
                        Continue
                    </Link>
                    {/* <Button title={continueBtn.title} /> */}
                </div>
            </div>
        </div>
  );
};

export default SearchUser;