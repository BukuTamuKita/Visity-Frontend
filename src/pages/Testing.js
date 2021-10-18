// import React from 'react';
import React, { useEffect, useState, useRef } from "react";
// import Button from '../components/Button';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';

const Auto = () => {
    const [display, setDisplay] = useState(false);
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");
    const [hosts, setHosts] = useState([]);
    const wrapperRef = useRef(null);
  
    useEffect(() => {
        axios
        .get('http://127.0.0.1:8000/api/hosts', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res.data.data);
            setHosts(res.data.data);
            // console.log(hosts);
        })
        
        setOptions(hosts);
    }, [hosts]);
  
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
  
    const updateHosts = hosts => {
      setSearch(hosts);
      setDisplay(false);
    };
  
    return (
        <div ref={wrapperRef} className="flex flex-col items-center justify-center">
            <div className="flex flex-col">
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
                        onClick={() => setDisplay(!display)}
                        value={search}
                        onChange={event => setSearch(event.target.value)}
                    />
                </div>
            </div>
        {display && (
          <div className="autoContainer">
            {options
              .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
              .map((value, i) => {
                return (
                  <div
                    onClick={() => updateHosts(value.name)}
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
    );
};
  
const Testing = ({ props }) => {
    // return (
    //     <div className="mx-auto flex justify-center items-center">
    //         <Button title={"Testing"}/>
    //     </div>
    // );
    return (
        <div className="App flex h-screen bg-red-100">
          {/* <h1>Custom AutoComplete React</h1> */}
          <div className="m-auto">
            <Auto />
          </div>
        </div>
      );
}

export default Testing;
