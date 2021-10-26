import React from "react";
import { Redirect, Route } from "react-router-dom";
import { isLogin } from "../utils/auth";

const PublicRoute = ({ 
    component: Component, 
    isNotFound, 
    restricted, 
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) => 
                isLogin() && restricted ? (
                    !isNotFound ? (
                        <Redirect to="/appointment/create" />
                    ) : (
                        <>
                            <Redirect to="/error" />
                            <Component {...props} />
                        </>
                    )
                ) : isNotFound ? (
                    <>
                        <Redirect to="/error" />
                        <Component {...props} />
                    </>
                ) : (
                    <Component {...props} />
                )
            }
        />
    )
}

export default PublicRoute