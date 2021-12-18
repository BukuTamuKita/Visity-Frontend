import LoginPage from '../pages/Login/LoginPage';
import CreateAppointment from '../pages/AppointmentPage/CreateAppointment';
import AppointmentHistory from '../pages/AppointmentPage/AppointmentHistory';
import UserList from '../pages/UserAdmin/UserList';
import GuestList from '../pages/GuestAdmin/GuestList';
import Testing from '../pages/Testing';

export const PUBLIC_ROUTE = [
    {
        name: "Login",
        path: "/",
        exact: true,
        component: LoginPage,
        restricted: true,
    },
];

export const PRIVATE_ROUTE = [
    {
        name: "Create Appointment",
        path: "/appointment-create",
        exact: true,
        component: CreateAppointment,
        private: true,
        restricted: false,
    },
    {
        name: "Appointment History",
        path: "/appointment-history",
        exact: true,
        component: AppointmentHistory,
        private: true,
        restricted: false,
    },
    {
        name: "User List",
        path: "/user-list",
        exact: true,
        component: UserList,
        private: true,
        restricted: false,
    },
    {
        name: "Guest List",
        path: "/guest-list",
        exact: true,
        component: GuestList,
        private: true,
        restricted: false,
    },
    {
        name: "Testing",
        path: "/testing",
        exact: true,
        component: Testing,
        private: true,
        restricted: false,
    },
];