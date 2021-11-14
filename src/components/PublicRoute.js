/*
    Public Route
    Prevent us from to restricted page (e.g Login & Register)
    for example, we go to the login page even though we are already logged in 
*/

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLogin } from "../utils/auth";

const PublicRoute = ({ component: Component, restricted = false, ...rest }) => {
    return (
        <Route {...rest} render={props => (
                isLogin() && restricted ? (
                    <Redirect to="/" />
                ) : (
                    <Component {...props} />
                )
            )}
        />
    )
};

export default PublicRoute;