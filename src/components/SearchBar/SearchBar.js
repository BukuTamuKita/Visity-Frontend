import React, { useState,useContext } from "react";
import "./SearchBar.css";
import SearchIcon from "@mui/icons-material/Search";
import { UserContext } from "../../context/UserContext";

const SearchBar = ({ data }) => {
  const [filteredData, setFilterredData] = useState([]);
  const [display, setDisplay] = useState(false);
  const [search, setSearch] = useState("");
  const {setValue} = useContext(UserContext);

  const updateHosts = (name) => {
    setSearch(name);
  };

  const handleFilter = (text) => {
    setSearch(text);
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(text.toLowerCase());
    });

    if (text === "") {
      setFilterredData([]);
    } else {
      setFilterredData(newFilter);
    }
    setSearch(text);
  };

  return (
    <div className="search flex flex-col items-center justify-center mb-16">
      <div className="flex flex-col md:w-2/5 w-4/5">
        <label
          htmlFor="company-website"
          className="block text-sm font-medium text-gray-700"
        >
          Search host
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <span className="inline-flex pl-4 items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
            <SearchIcon />
          </span>
          <input
            type="search"
            name="search-name"
            id="search-name"
            className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
            placeholder="Enter host name"
            onChange={(e) => handleFilter(e.target.value)}
            value={search}
            onClick={() => setDisplay(!display)}
          />
        </div>
      </div>
      {display && (
        <div className="dataResult md:w-2/5 sm:w-4/5 w-4/5 rounded-b-lg">
          {filteredData.length !== 0 && (
            <div>
              {filteredData.slice(0, 10).map((value, i) => {
                return (
                  <button
                    className="dataItem"
                    key={value.id}
                    onClick={() =>{
                      updateHosts(value.name);
                      setValue(value);
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