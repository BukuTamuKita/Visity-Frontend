import React from 'react';
import { 
    DescriptionOutlined, 
    PeopleAltOutlined, 
    PersonAddAlt1Outlined, 
    HistoryOutlined, 
    HandymanOutlined 
} from '@mui/icons-material';

const routes = [
    {
        title: "Appointment",
        path: "/appointment-create",
        exact: true,
        icon: <DescriptionOutlined />,
    },
    {
        title: "Guest",
        path: "/guest-list",
        icon: <PeopleAltOutlined />,
    },
    {
        title: "Users",
        path: "/user-list",
        icon: <PersonAddAlt1Outlined />,
    },
    {
        title: "History",
        path: "/appointment-history",
        icon: <HistoryOutlined />,
    },
    {
        title: "Testing",
        path: "/testing",
        icon: <HandymanOutlined />,
    },
];

export default routes;