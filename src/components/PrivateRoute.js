/*
    Private Route
    To check wheter we are logged in or not
    if not, we'll be redirected to login page
*/

import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isLogin } from "../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest} render={props => (
                isLogin() ? (
                    <Component {...props} />
                ) : (
                    // <Redirect to="/appointment-create" />
                    <Redirect to={{ pathname: "/", from: props.location }} />
                )
            )} 
        />
    )
};

export default PrivateRoute;