import React from "react";
import Testing from "../../pages/Testing";
import { 
    DocumentTextIcon, 
    UserGroupIcon, 
    UserAddIcon, 
    ReceiptRefundIcon,
    PuzzleIcon, 
} from '@heroicons/react/outline';

const routes = [
    {
        title: "Appointment",
        path: "/appointment-create",
        exact: true,
        icon: <DocumentTextIcon className="w-6" />,
    },
    {
        title: "Guest",
        path: "/guest-list",
        cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
        icon: <UserGroupIcon className="w-6" />,
    },
    {
        title: "Users",
        path: "/user-list",
        cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
        icon: <UserAddIcon className="w-6" />,
    },
    {
        title: "History",
        path: "/appointment-history",
        cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
        icon: <ReceiptRefundIcon className="w-6" />,
    },
    {
        title: "Testing",
        path: "/testing",
        cName: "block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white",
        icon: <PuzzleIcon className="w-6" />,
        main: () => <Testing />,
    },
];

export default routes;
