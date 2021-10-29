import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { setUserLogin, isLogin } from '../utils/auth';
// import Button from '../components/Button';
import Loader from "react-loader-spinner";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [visiblePass, setVisiblePass] = useState("password");
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const toCreateAppointment = () => {
        let path = "/appointment/create";
        history.push(path);
    }

    useEffect(() => {
        if (email) {
            setErrorEmail("");
        }
        if (password) {
            setErrorPassword("");
        }
        return () => {};
    }, [email, password]);

    const onLogin = (e) => {
        // e.preventDefault();
        setLoading(true);
        axios
        .post('http://127.0.0.1:8000/api/auth/loginAdmin', {
            email: email,
            password: password,
        })
        .then((res) => {
            setUserLogin(res.data.token);
        })
        .then(() => {
            if (isLogin()) {
                toCreateAppointment();
                setLoading(false);
            }
        })
        .catch((err) => {
            console.log(err);
            if (err.response) {
                if  (err.response.data?.error) {
                        setErrorEmail(err.response.data?.error ? err.response.data.error : "");
                } else if (err.response.data?.email || err.response.data?.password) {
                    setErrorEmail(err.response.data?.email ? err.response.data.email : "");
                    setErrorPassword(err.response.data?.password ? err.response.data.password : "");
                }
            } else {
                setErrorEmail(JSON.stringify(err));
            }
            setLoading(false);
        });
    }

    const enterPressed = (event) => {
        if (event.key === "Enter") {
            onLogin();
        }
    };

    const onVisibleChange = () => {
        if (visiblePass === "password") {
            setVisiblePass("text");
        } else {
            setVisiblePass("password");
        }
    }

    return (
        <div className="flex h-screen">
            <div className="mx-auto flex flex-col flex-start m-auto px-4 w-full xl:w-4/12 lg:w-2/5 md:w-2/4 sm:w-3/4">
                <div className="flex flex-col flex-start mb-8 text-gray-600">
                    <h2 className="text-4xl font-bold">Welcome</h2>
                    <p>Welcome back! Please enter your details.</p>
                    <div className="p-4 mt-4 w-full border rounded-lg bg-blue-50 text-gray-600">
                        <p>Cari email user di tabel <b>users</b> dengan role <b>admin</b>.</p>
                        <p>Semua password user sama, yaitu <b>password</b>.</p>
                    </div>
                </div>
                <form>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className="rounded-lg h-12 transition border-1 border-gray-300" 
                            type="text" 
                            value={email}
                            placeholder="Enter your email" 
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrorEmail("");
                            }}
                            // onKeyPress={(e) => {
                            //     enterPressed(e);
                            // }}
                        />
                        {errorEmail !== "" ? (
                            <span>{ errorEmail }</span>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="password">Password</label>
                        <input 
                            id="password"
                            className="rounded-lg h-12 transition border-1 border-gray-300"
                            type={visiblePass} 
                            value={password}
                            placeholder="Enter your password" 
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrorPassword("");
                            }}
                            onKeyPress={(e) => {
                                enterPressed(e);
                            }}
                        />
                        {errorPassword !== "" ? (
                            <span>{ errorPassword }</span>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="flex items-start mb-16">
                        <div className="flex items-center h-5">
                            <input
                                id="comments"
                                name="comments"
                                type="checkbox"
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                                onChange={onVisibleChange}
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="font-medium text-gray-600">
                                View Password
                            </label>
                        </div>
                    </div>
                    {/* <Button 
                        disabled={loading} 
                        // content={loginBtn.content} 
                        width={loginBtn.width} 
                        action={onLogin}
                    /> */}
                    <button 
                        className="px-4 py-2 w-full text-white border-2 border-white rounded-lg transition bg-indigo-700 hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                        onClick={onLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex justifty-center items-center">
                                <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                            </span>
                        ) : (
                            <span>Login</span>
                        )}
                    </button>
                </form>   
            </div>
        </div>
    )
};

export default Login;