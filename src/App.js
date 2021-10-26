import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import "tailwindcss/tailwind.css";
import SearchUser from "./pages/SearchUser";
import UserAdmin from "./pages/UserAdmin";
import AppointmentHistory from "./pages/AppointmentHistory";
import Testing from "./pages/Testing";
import CreateUser from "./pages/CreateUser";
import AppointmentPage from "./pages/AppointmentPage";
import Login from "./pages/Login";
import "./App.css";
import Drawer from "./components/Drawer";
import { APP_ROUTE } from "./routes/routes";
import PublicRoute from "./components/PublicRoute";

function App() {
  const [value, setValue] = useState("");

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
    </Router>
  );
}

export default App;
