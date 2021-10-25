import React from 'react';
import SearchUser from '../../pages/SearchUser';
import UserAdmin from "../../pages/UserAdmin";
import AppointmentHistory from "../../pages/AppointmentHistory";

const routes = [
  {
    title: "Add Appointment",
    path: "/search",
    exact : true,
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
    main : () => <SearchUser />
  },
  {
    title: "User Administration",
    path: "/user",
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
      main : () => <UserAdmin />
  },
  {
    title: "History Appointment",
    path: "/history",
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
      main: () => <AppointmentHistory />
  },
];

export default routes;