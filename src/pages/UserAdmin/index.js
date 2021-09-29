import { Route } from "react-router";
import React from 'react';
import { useHistory } from "react-router";

const UserAdmin = ({ navigation }) => {
  const history = useHistory();

  const routeChange = () => {
    let path = `/createUser`;
    history.push(path);
  };
return (
<div className="flex min-h-screen justify-center items-center">
  <div class="mb-4">
    <button onClick={routeChange} class="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-gray-500 hover:bg-gray-600 active:bg-gray-700 focus:ring-gray-300" type="submit">Button</button>
  </div>
</div>
);
};
export default UserAdmin;