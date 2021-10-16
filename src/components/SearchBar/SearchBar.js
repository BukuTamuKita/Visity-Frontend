import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
// import { Link } from 'react-router-dom';

const SearchBar = ({ data }) => {
    const [filteredData, setFilterredData] = useState([]);

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilterredData([]);
        } else {
            setFilterredData(newFilter);
        }
    }

    return (
        <div className="search flex flex-col items-center justify-center mb-16">
            <div className="flex flex-col md:w-2/5 w-4/5">
                <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
                    Search host
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex pl-4 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <SearchIcon/>
                    </span>
                    <input
                        type="search"
                        name="search-name"
                        id="search-name"
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="Enter host name"
                        onChange={handleFilter}
                    />
                </div>
            </div>
            { filteredData.length !== 0 && (
                <div className="dataResult md:w-2/5 sm:w-4/5 w-4/5 rounded-b-lg">
                    {filteredData.slice(0, 10).map((value) => {
                        return (
                            <button 
                                className="dataItem" 
                                key={value.id}
                            >
                                <p>{value.name}</p>
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default SearchBar;
