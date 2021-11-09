/*
    Public Route
    untuk mencegah kita untuk ke halaman yang restricted (e.g Login & Register)
    misal kita ke halaman login padahal sudah login
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