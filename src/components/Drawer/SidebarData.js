import React from "react";
import CreateAppointment from "../../pages/AppointmentPage/CreateAppointment";
import AppointmentHistory from "../../pages/AppointmentPage/AppointmentHistory";
import UserList from "../../pages/UserAdmin/UserList";
import GuestList from "../../pages/GuestAdmin/GuestList";
import Testing from "../../pages/Testing";

const routes = [
  // {
  //   title: "Create Appointment",
  //   path: "/admin/appointment/create",
  //   exact : true,
  //   cName:
  //     "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
  //   main : () => <CreateAppointment />
  // },
  // {
  //   title: "History Appointment",
  //   path: "/admin/appointment/history",
  //   cName:
  //     "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
  //     main: () => <AppointmentHistory />
  // },
  // {
  //   title: "User Administration",
  //   path: "/admin/user/list",
  //   cName:
  //     "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
  //     main : () => <UserList />
  // },
  // {
  //   title: "Guest Administration",
  //   path: "/admin/guest/list",
  //   cName:
  //     "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
  //     main : () => <GuestList />
  // },
  // {
  //   title: "Testing",
  //   path: "/admin/testing",
  //   cName:
  //     "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
  //     main: () => <Testing />
  // },

  {
    title: "Create Appointment",
    path: "/appointment/create",
    exact : true,
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
    main : () => <CreateAppointment />
  },
  {
    title: "History Appointment",
    path: "/appointment/history",
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
      main: () => <AppointmentHistory />
  },
  {
    title: "User Administration",
    path: "/user/list",
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
      main : () => <UserList />
  },
  {
    title: "Guest Administration",
    path: "/guest/list",
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
      main : () => <GuestList />
  },
  {
    title: "Testing",
    path: "/testing",
    cName:
      "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
      main: () => <Testing />
  },
];

export default routes;