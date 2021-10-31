import React, { 
  // useState,
} from "react";
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
import { APP_ROUTE } from "./routes/routes";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  // const [value, setValue] = useState("");
  const path = window.location.pathname;

  return (
    // YANG DIPAKE:
    <Router>
      <div className="flex">
        
        <div className="h-screen sticky top-0">
          {(path !== "/") && <Drawer />}
        </div>
          
        {/* Main Content */}
        <div className="flex-auto">
          <Switch>
            {APP_ROUTE.map((value, index) => {
              if (value.private) {
                return (
                  <PrivateRoute 
                    key={value.name}
                    component={value.component} 
                    path={value.path} 
                    exact={value.exact}
                  />
                )
              } else {
                return (
                  <PublicRoute 
                    key={value.name}
                    restricted={value.restricted}
                    component={value.component} 
                    path={value.path} 
                    exact={value.exact}
                  />
                )
              }
            })}
          </Switch>
        </div>

      </div>
    </Router>
      
    // TESTING:

    // <Router>
    //   <div className="relative min-h-screen md:flex">
    //     {!(window.location.pathname === "/") && <Drawer />}
    //     <div className={"flex-auto"}>
    //       <Switch>
    //         <Route path="/" component={Login} exact />
    //           {/* <UserContext.Provider value={{ value, setValue }}> */}
    //           <Route path="/appointment/create" component={AppointmentPage} exact />
    //           <Route path="/appointment/history" component={AppointmentHistory} />
    //           <Route path="/user/list" component={UserAdmin} exact/>
    //           <Route path="/user/create" component={CreateUser} exact/>
    //           <Route path="/user/update" component={UpdateUser} exact/>
    //           <Route path="/guest/list" component={GuestAdmin} exact/>
    //           <Route path="/testing" component={Testing} exact/>  
    //           {/* </UserContext.Provider> */}
    //       </Switch>
    //     </div>
    //   </div>
    // </Router>
  );
}

export default App;
