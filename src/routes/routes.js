import Login from "../pages/Login";
import AppointmentPage from "../pages/AppointmentPage";
import AppointmentHistory from "../pages/AppointmentHistory";
import UserAdmin from "../pages/UserAdmin";
import CreateUser from "../pages/CreateUser";
import UpdateUser from "../pages/UpdateUser";
import Testing from "../pages/Testing";
import ErrorPage from "../pages/ErrorPage";

export const APP_ROUTE = [
    {
        name: "Login",
        path: "/login",
        exact: true,
        component: Login,
        restricted: true,
    },
    {
        name: "Login",
        path: "/",
        exact: true,
        component: Login,
        restricted: true,
    },
    {
        name: "Register",
        path: "/register",
        exact: true,
        component: Login,
        restricted: true,
    },
    {
        name: "Appointment Page",
        path: "/appointment/create",
        exact: true,
        component: AppointmentPage,
        private: true,
        isAdmin: true,
    },
    {
        name: "Appointment History",
        path: "/appointment/history",
        exact: true,
        component: AppointmentHistory,
        private: true,
        isAdmin: true,
    },
    {
        name: "User List",
        path: "/user/list",
        exact: true,
        component: UserAdmin,
        private: true,
        isAdmin: true,
    },
    {
        name: "Create User",
        path: "/user/create",
        exact: true,
        component: CreateUser,
        private: true,
        isAdmin: true,
    },
    {
        name: "Update User",
        path: "/user/update",
        exact: true,
        component: UpdateUser,
        private: true,
        isAdmin: true,
    },
    // {
    //     name: "Guest List",
    //     path: "/guest/list",
    //     exact: true,
    //     component: Login,
    //     private: true,
    //     isAdmin: true,
    // },
    {
        name: "Testing",
        path: "/testing",
        exact: true,
        component: Testing,
        private: true,
        isAdmin: true,
    },
    {
        name: "Error | Page Not Found",
        path: "/*",
        exact: true,
        component: ErrorPage,
        private: true,
        isNotFound: true
    },
    {
        name: "Error | Page Not Found",
        path: "/error",
        exact: true,
        component: ErrorPage,
        private: true,
        isNotFound: true
    },
]