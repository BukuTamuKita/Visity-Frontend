import Login from "../pages/Login";

export const APP_ROUTE = [
    {
        name: "Login",
        path: '/login',
        exact: true,
        component: Login,
        restricted: true
    },
    {
        name: "Login",
        path: '/',
        exact: true,
        component: Login,
        restricted: true
    },
]