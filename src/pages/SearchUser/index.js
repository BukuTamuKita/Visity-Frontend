import React, { useState, useEffect, useRef,useCallback } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
// import { Link } from 'react-router-dom';
import axios, { Axios } from "axios";
import Button from "../../components/Button";


const SearchUser = () => {
  const [display, setDisplay] = useState(false);
  // const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState({});
  const wrapperRef = useRef(null);
  const continueBtn = {
    title: "Continue",
  };

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });
  
  const fetchData = useCallback(async () =>{
        try {
            const result = await authAxios.get('http://127.0.0.1:8000/api/hosts');
            setHosts(result.data.data);
            console.log(hosts);
        }catch(err){
            console.log("error");
        }
  })

  useEffect(()=>{
    fetchData();
  },[]);
  
  // useEffect(() => {
  //   window.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //   };
  // });

  // const handleClickOutside = (event) => {
  //   const { current: wrap } = wrapperRef;
  //   if (wrap && !wrap.contains(event.target)) {
  //     setDisplay(false);
  //   }
  // };

  // const updateHosts = (name, i) => {
  //   if (name === hosts[i].name) {
  //     setSelectedHost(hosts[i]);
  //   }
  //   setSearch(name);
  //   setDisplay(false);
  //   console.log(i);
  // };

  return (
    <div>
      {/* <SearchBar data={fetchData} /> */}
      <SearchBar placeholder="Cari nama..." data={hosts}/>
      <button className = "w-10 h-10 bg-blue" onClick = {fetchData} title="coba" />
      <div className="flex flex-col items-center justify-center">
        <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
          <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
            <p className="text-xl">{selectedHost.name}</p>
            <p className="text-2lg">{selectedHost.position}</p>
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
};

export default SearchUser;
