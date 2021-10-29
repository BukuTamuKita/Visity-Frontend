import React, { 
  // useState,
} from "react";
import { 
  BrowserRouter as Router, 
  Switch, 
  Route, 
  // Redirect 
} from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import Login from "./pages/Login";
import AppointmentPage from "./pages/AppointmentPage/CreateAppointment";
import AppointmentHistory from "./pages/AppointmentPage/AppointmentHistory";
import UserAdmin from "./pages/UserAdmin/UserList";
import CreateUser from "./pages/UserAdmin/CreateUser";
import UpdateUser from "./pages/UserAdmin/UpdateUser";
import GuestAdmin from "./pages/GuestAdmin/GuestList";
import Testing from "./pages/Testing";
import Drawer from "./components/Drawer";
// import { APP_ROUTE } from "./routes/routes";
// import PublicRoute from "./components/PublicRoute";
// import PrivateRoute from "./components/PrivateRoute";
// import { UserContext } from "./context/UserContext";

function App() {
    // const [value, setValue] = useState("");
    // const path = window.location.pathname;

    return (
        // <Router>
        //   <div className="relative min-h-screen md:flex">
        //     <Drawer />
        //     <div className={"flex-auto"}>
        //       <Switch>
        //         <Route path="/" component={Login} exact />
        //         <UserContext.Provider value={{ value, setValue }}>
        //           <Route path="/search" component={SearchUser} exact />
        //           <Route path="/appointment" component={AppointmentPage} />
        //           <Route path="/user" component={UserAdmin} exact/>
        //           <Route path="/history" component={AppointmentHistory} exact/>
        //           <Route path="/testing" component={Testing} exact/>
        //           <Route path="/createUser" component={CreateUser} exact/>
        //         </UserContext.Provider>
        //       </Switch>
        //     </div>
        //   </div>
        // </Router>

        // <Router>
        //   <div className="relative min-h-screen md:flex">
        //     {!(window.location.pathname == "/") && <Drawer />}
        //     <div className="flex-auto">
        //       <Switch>
        //           {APP_ROUTE.map((value, index) => {
        //               return (
        //                   <PublicRoute 
        //                     key={value.name} 
        //                     restricted={value.restricted} 
        //                     path={value.path} 
        //                     component={value.component} 
        //                     exact={value.exact} 
        //                     isNotFound={value.isNotFound} 
        //                   />
        //               );
        //           })}
        //           <Route path="/">
        //               <Redirect to="/login" />
        //           </Route>
        //       </Switch>
        //     </div>
        //   </div>
        // </Router>

        // <Router>
        //   <Switch>
        //     {APP_ROUTE.map((value, index) => {
        //       return (
        //         <PublicRoute
        //           key={value.name}
        //           restricted={value.restricted}
        //           path={value.path}
        //           component={value.component}
        //           exact={value.exact}
        //           isNotFound={value.isNotFound}
        //         />
        //       );
        //     })}
        //     <Route path="/">
        //       <Redirect to="/login" />
        //     </Route>
        //   </Switch>
        // </Router>

        // YANG DIPAKE:

        // <Router>
        //   <div className="relative min-h-screen md:flex">
        //     {/* {!(path == "/") && <Drawer />} */}
        //     {APP_ROUTE.map((value, index) => {
        //       if ((path == "/") || (path != value.path)) {
        //         <Drawer />
        //       }
        //     })}
        //     <div className="flex-auto">
        //       <Switch>
        //           {APP_ROUTE.map((value, index) => {
        //             if (value.private) {
        //               return (
        //                 <PrivateRoute 
        //                   key={value.name}
        //                   path={value.path} 
        //                   component={value.component} 
        //                   exact={value.exact}
        //                 />
        //               );
        //             } else {
        //               return (
        //                 <PublicRoute 
        //                   key={value.name}
        //                   restricted={value.restricted}
        //                   path={value.path} 
        //                   component={value.component} 
        //                   exact={value.exact}
        //                 />
        //               );
        //             }
        //           })}
        //       </Switch>
        //     </div>
        //   </div>
        // </Router>
        
        // TESTING:

        <Router>
          <div className="relative min-h-screen md:flex">
            {!(window.location.pathname === "/") && <Drawer />}
            <div className={"flex-auto"}>
              <Switch>
                <Route path="/" component={Login} exact />
                {/* <UserContext.Provider value={{ value, setValue }}> */}
                <Route path="/appointment/create" component={AppointmentPage} exact />
                <Route path="/appointment/history" component={AppointmentHistory} />
                <Route path="/user/list" component={UserAdmin} exact/>
                <Route path="/user/create" component={CreateUser} exact/>
                <Route path="/user/update" component={UpdateUser} exact/>
                <Route path="/guest/list" component={GuestAdmin} exact/>
                <Route path="/testing" component={Testing} exact/>
                {/* </UserContext.Provider> */}
              </Switch>
            </div>
          </div>
        </Router>

        // <Router>
        //   <Switch>
        //     {APP_ROUTE.map((value, index) => {
        //       if (value.restricted) {
        //         return (
        //           <PublicRoute
        //             key={value.name}
        //             path={value.path} 
        //             restricted={value.restricted} 
        //             component={value.component} 
        //             exact={value.exact} 
        //             isNotFound={value.isNotFound} 
        //           />
        //         );
        //       } else {
        //         return (
        //           <PrivateRoute 
        //             key={value.name}
        //             path={value.path} 
        //             component={value.component} 
        //             exact={value.exact} 
        //             isNotFound={value.isNotFound} 
        //           />
        //         )
        //       }
        //     })}
        //   </Switch>
        // </Router>
    );
}

export default App;
