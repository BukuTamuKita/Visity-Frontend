import React, { useState, useEffect, useRef } from 'react';
// import SearchBar from '../../components/SearchBar/SearchBar';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../../components/Button';

const SearchUser = () => {
    const [display, setDisplay] = useState(false);
    // const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const [hosts, setHosts] = useState([]);
    const [selectedHost, setSelectedHost] = useState({});
    const wrapperRef = useRef(null);
    const continueBtn = {
        title: "Continue"
    };

    useEffect(() => {
        axios
        .get('http://127.0.0.1:8000/api/hosts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res.data.data);
            // setHosts(res.data.data);
        })
        // setOptions(hosts);
    });

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
            window.removeEventListener("mousedown", handleClickOutside);
        };
    });
  
    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
            setDisplay(false);
        }
    };
  
    const updateHosts = (name, i) => {
        if (name === hosts[i].name) {
            setSelectedHost(hosts[i]);
        }
        setSearch(name);
        setDisplay(false);
        console.log(i);
    };

    return (
        <div>
            <div ref={wrapperRef} className="mx-auto flex-container flex-column pos-rel">
                <input
                    id="auto"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    onClick={() => setDisplay(!display)}
                    placeholder="Type to search"
                    value={search}
                    onChange={event => setSearch(event.target.value)} />
                {display && (
                    <div className="autoContainer">
                        {hosts
                        .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
                        .map((value, i) => {
                            return (
                                <div
                                    onClick={() => updateHosts(value.name, i)}
                                    className="option"
                                    key={i}
                                    tabIndex="0"
                                >
                                    <span>{value.name}</span>
                                    {/* <img src={value.sprite} alt="pokemon" /> */}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            {/* <SearchBar placeholder="Cari nama..." data={hosts}/> */}
            
            <div className="flex flex-col items-center justify-center">
                <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
                    <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
                        <p className="text-xl">{ selectedHost.name }</p>
                        <p className="text-2lg">{ selectedHost.position }</p>
                    </div>
                    <div className="right-card md:col-span-2 md:mx-2.5 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300">
                        <p className="text-3xl">Meeting List</p>
                    </div>
                </div>
                <div className="mt-8 rounded text-center">
                    {/* <Link 
                        className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300" 
                        to="/appointment"
                    >
                        CONTINUE
                    </Link> */}
                    <Button title={continueBtn.title} />
                </div>
            </div>
        </div>
    );
}

export default SearchUser;