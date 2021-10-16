import React,{useState} from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import MockData from "../../Data2.json";
import { Link } from "react-router-dom";
import ShowUser from "../../components/showUser";

const SearchUser = () => {
  const [dispay, setDisplay] = useState(false);
  
  return (
    <div className="ml-48 pt-10">
      <SearchBar placeholder="Cari nama..." data={MockData} />
      <ShowUser />
      <div className="mt-8 rounded text-center">
        
      </div>
    </div>
  );
};

export default SearchUser;
