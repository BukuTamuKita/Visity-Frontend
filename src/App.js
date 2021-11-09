import React,{useEffect} from "react"; // useState,
import {
    BrowserRouter as Router,
    Switch,
    // Redirect
} from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import Drawer from "./components/Drawer";
// import Login from "./pages/Login";
// import AppointmentPage from "./pages/AppointmentPage/CreateAppointment";
// import AppointmentHistory from "./pages/AppointmentPage/AppointmentHistory";
// import UserAdmin from "./pages/UserAdmin/UserList";
// import CreateUser from "./pages/UserAdmin/CreateUser";
// import UpdateUser from "./pages/UserAdmin/UpdateUser";
// import GuestAdmin from "./pages/GuestAdmin/GuestList";
// import Testing from "./pages/Testing";
// import { UserContext } from "./context/UserContext";
import { APP_ROUTE, PRIVATE_ROUTE } from "./routes/routes";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    // const [value, setValue] = useState("");
    const path = window.location.pathname;
    
    return (
        <Router>
            <Switch>
                {APP_ROUTE.map((value, index) => {
                    return (
                        <PublicRoute
                            key={value.name}
                            restricted={value.restricted}
                            component={value.component}
                            path={value.path}
                            exact={value.exact}
                        />
                    );
                })}
                <div className="flex">
                    <div className="h-screen sticky top-0">
                        <Drawer />
                    </div>

                    {/* Main Content */}
                    <div className="flex-auto">
                        {PRIVATE_ROUTE.map((value, index) => {
                            return (
                                <PrivateRoute
                                    key={value.name}
                                    component={value.component}
                                    path={value.path}
                                    exact={value.exact}
                                />
                            );
                        })}
                    </div>
                </div>
            </Switch>
        </Router>

    );
}

export default App;
