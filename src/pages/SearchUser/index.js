import React, {
  useState,
  useEffect,
} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import axios from "axios";
import { JWT_HEADER, SHOW_HOSTS } from "../../constants/urls";
import { isLogin } from "../../utils/auth";

const SearchUser = () => {
  const [hosts, setHosts] = useState([]);

  const fetchHosts = async () => {
    const response = await axios.get(SHOW_HOSTS, {
      headers: { Authorization: `Bearer ${JWT_HEADER}` },
    })
    .catch((err) => console.log(err))
    
    if (response && isLogin()) {
      const hosts = response.data;

      console.log("hosts: ", hosts);
      setHosts(response.data.data);
    }
  };

  useEffect(() => {
    fetchHosts();
  }, []);

  return (
    <div className="mt-16">
      <SearchBar placeholder="Cari nama..." data={hosts}/>

      {/* {value &&
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
          </div>
        </div>
      } */}
    </div>
  );
};

export default SearchUser;