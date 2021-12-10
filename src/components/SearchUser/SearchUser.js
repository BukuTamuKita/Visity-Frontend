import React, { useState, useEffect } from 'react';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import { SHOW_HOSTS } from '../../constants/urls';

const SearchBar = ({ getFilteredHost, attribute }) => {
    const [filteredHost, setFilterredHost] = useState([]);
    const [search, setSearch] = useState('');
    const [display, setDisplay] = useState(false);
    
    const [hosts, setHosts] = useState([]);

    useEffect(() => {
        axios
            .get(SHOW_HOSTS, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                setHosts(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            })

        return () => {
            setHosts([]);
        } 
    }, []);

    const updateHosts = (host) => {
        getFilteredHost(host);
        setSearch(host.name);
        setDisplay(!display);
    };

    const handleFilter = (e) => {
        const searchWord = e.target.value;

        const newFilter = hosts.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === '') {
            setFilterredHost([]);
        } else {
            setFilterredHost(newFilter);
        }
        
        setSearch(searchWord);
    };

    return (
        <div className={`${attribute.style} relative`}>
            <div className="col-span-3 sm:col-span-2">
                <label htmlFor="search-host" className="block text-sm font-medium text-gray-700">
                    {attribute.label}
                </label>
                <div className="mt-1 flex rounded-lg shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                        <SearchRoundedIcon />
                    </span>
                    <input
                        type="search"
                        name="search-host"
                        id="search-host"
                        className="bg-gray-50 focus:ring-primary focus:border-primary transition flex-1 block w-full rounded-none rounded-r-md text-sm text-gray-700 border-gray-300 placeholder-gray-300"
                        placeholder={attribute.placeholder}
                        onChange={handleFilter}
                        value={search}
                        onClick={() => setDisplay(true)}
                    />
                </div>
            </div>

            {display && (
                <>
                    {filteredHost.length !== 0 && (
                        <ul className="no-scrollbar absolute w-full h-48 mt-1 rounded-lg shadow-lg select-none bg-white overflow-hidden overflow-y-auto">
                            {filteredHost.slice(0, 10).map((value, index) => {
                                return (
                                    <li
                                        className="hover:bg-gray-200 cursor-pointer"
                                        key={value.id}
                                        onClick={() => updateHosts(value)}
                                    >
                                        <p className="px-4 py-2">{ value.name }</p>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </>
            )}
        </div>
    );
};

export default SearchBar;