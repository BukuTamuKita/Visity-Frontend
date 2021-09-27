import React from "react";
import { SearchContainer } from "./SearchUserElements";
import { Button } from "../../components";
import { useHistory } from "react-router";

const SearchUser = ({ navigation }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/appointment`;
    history.push(path);
  };
  return (
    <SearchContainer>
      <div className="flex min-h-screen justify-center items-center">
        <div>
          <Button title={"Continue"} onClick={routeChange} />
        </div>
      </div>
    </SearchContainer>
  );
};

export default SearchUser;
