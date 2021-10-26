import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import { APP_ROUTE } from "./routes/routes";
import PublicRoute from "./components/PublicRoute";
// import { UserContext } from "./context/UserContext";
// import SearchUser from "./pages/SearchUser";
// import UserList from "./pages/UserAdmin/UserList";
// import AppointmentHistory from "./pages/AppointmentPage/AppointmentHistory";
// import Testing from "./pages/Testing";
// import CreateUser from "./pages/UserAdmin/CreateUser";
// import AppointmentPage from "./pages/AppointmentPage/CreateAppointment";
// import Login from "./pages/Login";
import Drawer from "./components/Drawer";

function App() {
  // const [value, setValue] = useState("");

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

    <Router>
      <div className="relative min-h-screen md:flex">
        <Drawer />
        <div className="flex-auto">
          <Switch>
            {APP_ROUTE.map((value, index) => {
              return (
                // <UserContext.Provider value={{ value, setValue }}>
                  <PublicRoute
                    key={value.name}
                    restricted={value.restricted}
                    path={value.path}
                    component={value.component}
                    exact={value.exact}
                    isNotFound={value.isNotFound}
                  />
                // </UserContext.Provider>
              )
            })}
            <Route path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
