import React from "react";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import "tailwindcss/tailwind.css";
import "./App.css";
import Drawer from "./components/Drawer";
import { APP_ROUTE, PRIVATE_ROUTE } from "./routes/routes";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <Switch>
                <>
                    {APP_ROUTE.map((value, index) => {
                        return (
                            <PublicRoute
                                key={value.name}
                                restricted={value.restricted}
                                component={value.component}
                                path={value.path}
                                exact={value.exact}
                            />
                        )
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
                                )
                            })}
                        </div>
                    </div>
                </>
            </Switch>
        </Router>
    );
}

export default App;