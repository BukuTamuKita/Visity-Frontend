import Login from "../pages/Login";
import CreateAppointment from "../pages/AppointmentPage/CreateAppointment";
import AppointmentHistory from "../pages/AppointmentPage/AppointmentHistory";
import UserList from "../pages/UserAdmin/UserList";
import CreateUser from "../pages/UserAdmin/CreateUser";
import UpdateUser from "../pages/UserAdmin/UpdateUser";
import GuestList from "../pages/GuestAdmin/GuestList";
import Testing from "../pages/Testing";
// import AdminContainer from "../components/Admin/AdminContainer";
import ErrorPage from "../pages/ErrorPage";
import SearchUser from "../pages/SearchUser";

export const APP_ROUTE = [
    // {
    //     name: "Login",
    //     path: "/login",
    //     exact: true,
    //     component: Login,
    //     restricted: true,
    // },
    {
        name: "Login",
        path: "/",
        exact: true,
        component: Login,
        restricted: true,
    },
    {
        name: "Create Appointment",
        path: "/appointment-create",
        exact: true,
        component: CreateAppointment,
        private: true,
        // isAdmin: true,
    },
    {
        name: "Search User",
        path: "/search",
        exact: true,
        component: SearchUser,
        private: true,
        // isAdmin: true,
    },
    {
        name: "Appointment History",
        path: "/appointment-history",
        exact: true,
        component: AppointmentHistory,
        private: true,
        // isAdmin: true,
    },
    {
        name: "User List",
        path: "/user-list",
        exact: true,
        component: UserList,
        private: true,
        // isAdmin: true,
    },
    {
        name: "Create User",
        path: "/user-create",
        exact: true,
        component: CreateUser,
        private: true,
        // isAdmin: true,
    },
    {
        name: "Update User",
        path: "/user-update",
        exact: true,
        component: UpdateUser,
        private: true,
        // isAdmin: true,
    },
    {
        name: "Guest List",
        path: "/guest-list",
        exact: true,
        component: GuestList,
        private: true,
        // isAdmin: true,
    },
    {
        name: "Testing",
        path: "/testing",
        exact: true,
        component: Testing,
        private: true,
        // isAdmin: true,
    },
    {
        name: "Error | Page Not Found",
        path: "/*",
        exact: true,
        component: ErrorPage,
        private: true,
        isNotFound: true,
    },
    {
        name: "Error | Page Not Found",
        path: "/error",
        exact: true,
        component: ErrorPage,
        private: true,
        isNotFound: true,
    },
];