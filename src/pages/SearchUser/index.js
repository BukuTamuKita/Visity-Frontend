import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";
import Button from "../../components/Button";
import { UserContext } from "../../context/UserContext";

const SearchUser = () => {
  const [hosts, setHosts] = useState([]);
  const [selectedHost, setSelectedHost] = useState({});
  const [appointment, setAppointment] = useState([]);
  const wrapperRef = useRef(null);
  const { value } = useContext(UserContext);
  
  const continueBtn = {
    title: "Continue",
  };

  const authAxios = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  });

  const fetchData = useCallback(async () => {
    try {
      const result = await authAxios.get("hosts");
      setHosts(result.data.data);
      console.log(hosts);
    } catch (err) {
      console.log("error");
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    getHostInformation();
  }, [value.id]);
  
  const getHostInformation = useCallback(async() => {
    try {
        const res = await authAxios.get(`hosts/${value.id}/appointments`);
        setAppointment(res.data.data);
        console.log(appointment);
    }
    catch (err){
        console.log(err);
    }
  });

   

  // useEffect(() => {
  //   window.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     window.removeEventListener("mousedown", handleClickOutside);
  //   };
  // });

    const getHostFromSearchBar = (host) => {
        getHostInformation(host);
    };

    // const searchAPI = () => {
    //     axios
    //     .get('http://127.0.0.1:8000/api/hosts', {
    //         headers: {
    //             Authorization: "Bearer " + localStorage.getItem("token"),
    //         },
    //     })
    //     .then(res => {
    //         console.log("searchAPI: ", res.data.data);
    //         setHosts(res.data.data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     });
    // }

  return (
    <div>
      {/* <SearchBar data={fetchData} /> */}
      <SearchBar placeholder="Cari nama..." data={hosts} />
      {/* <button onClick={getHostInformation} title = "coba">coba</button> */}
      <div className="flex flex-col items-center justify-center">
        <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
          <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
            <p className="text-xl">{value.name}</p>
            <p className="text-2lg">{value.position}</p>
          </div>
          <div className="right-card md:col-span-2 md:mx-2.5 p-4 shadow-sm border border-solid border-current rounded-lg border-gray-300">
            <p className="text-3xl mb-6">Meeting List</p>
            {appointment.length !== 0 &&
              appointment.map((data) => {
                return (
                  <div key={data.id} className="flex justify-between">
                    <p>{data.guest.name}</p>
                    <p>{data.status}</p>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="mt-8 rounded text-center">
          <Link
            className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-blue-800 hover:bg-blue-600 active:bg-blue-700 focus:ring-blue-300"
            to="/appointment"
          >
            CONTINUE
          </Link>
          {/* <Button title={continueBtn.title} to='/appointment' /> */}
        </div>

      </div>
      </div>
    );
};

export default SearchUser;