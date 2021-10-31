import React, { 
  useState, 
  // useContext 
} from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
// import { UserContext } from "../../context/UserContext";

const SearchBar = ({ data, getFilteredHost, attribute }) => {
  const [filteredHost, setFilterredHost] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);
  // const {setValue} = useContext(UserContext);

  const updateHosts = (host) => {
    console.log("updateHost: ", host.name);
    getFilteredHost(host);
    setSearch(host.name);
    setDisplay(!display);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    // setSearch(searchWord);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilterredHost([]);
    } else {
      console.log("new filter: ", newFilter);
      setFilterredHost(newFilter);
    }
    setSearch(searchWord);
  };

  return (
    <div className={`${attribute.style}`}>
      <div className="col-span-3 sm:col-span-2">
        <label htmlFor="search-host" className="block text-sm font-medium text-gray-700">
          { attribute.label }
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            <SearchIcon />
          </span>
          <input
            type="search"
            name="search-host"
            id="search-host"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder={ attribute.placeholder }
            onChange={handleFilter}
            value={search}
            onClick={() => setDisplay(true)}
          />
        </div>
      </div>

      {display && (
        <div className="parent bg-blue-100">
          {filteredHost.length !== 0 && (
            <div className="dataResult bg-red-100 rounded-b-lg">
              {filteredHost.slice(0, 10).map((value, index) => {
                return (
                  <button
                    className="dataItem"
                    key={value.id}
                    onClick={() =>{
                      updateHosts(value);
                      // console.log("Host hasil filter:", filteredHost);
                      // getFilteredHost(filteredHost);
                      // setDisplay(!display);
                    }}
                  >
                    <p>{value.name}</p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;