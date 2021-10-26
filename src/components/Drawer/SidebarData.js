const routes = [
  {
    title: "Create Appointment",
    path: "/appointment/create",
    exact : true,
    cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer",
  },
  {
    title: "Appointment History",
    path: "/appointment/history",
    cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer",
  },
  {
    title: "User Administration",
    path: "/user/list",
    cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer",
  },
  {
    title: "Testing",
    path: "/testing",
    cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white cursor-pointer",
  },
];

export default routes;