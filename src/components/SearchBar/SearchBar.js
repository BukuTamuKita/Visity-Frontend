import React, { 
  useState,
} from "react";
import "./SearchBar.css";

const SearchBar = ({ data, getFilteredHost, attribute }) => {
  const [filteredHost, setFilterredHost] = useState([]);
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState(false);

  const updateHosts = (host) => {
    console.log("updateHost: ", host.name);
    getFilteredHost(host);
    setSearch(host.name);
    setDisplay(!display);
  };

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    const newFilter = data.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilterredHost([]);
    } else {
      setFilterredHost(newFilter);
    }
    setSearch(searchWord);
  };

  return (
      <div className={`${attribute.style}`}>
          <div className="col-span-3 sm:col-span-2">
              <label
                  htmlFor="search-host"
                  className="block text-sm font-medium text-gray-700"
              >
                  {attribute.label}
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                      <svg
                          class="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                      >
                          <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          ></path>
                      </svg>
                  </span>
                  <input
                      type="search"
                      name="search-host"
                      id="search-host"
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                      placeholder={attribute.placeholder}
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
                                      onClick={() => {
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

          {/* {display && (
        <div className="autoContainer">
          {data
            .filter(({ name }) => name.indexOf(search.toLowerCase()) > -1)
            .map((value, i) => {
              return (
                <div
                  onClick={() => updateHosts(value.name)}
                  key={i}
                >
                  <span>{value.name}</span>
                </div>
              );
            })}
        </div>
      )} */}
      </div>
  );
};

export default SearchBar;