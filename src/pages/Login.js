import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [visiblePass, setVisiblePass] = useState("password");
    const loginBtn = {
        title: "Login",
        width: "w-full"
    }
    const history = useHistory();

    const toSearchUserPage = () => {
        let path = "/";
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

    const submit = (e) => {
        e.preventDefault();
        axios
        .post('http://127.0.0.1:8000/api/auth/loginAdmin', {
            email: email,
            password: password,
        })
        .then((res) => {
            localStorage.setItem('token', res.data.token);
            toSearchUserPage();
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
        });
    }

    const enterPressed = (event) => {
        if (event.key === "Enter") {
            submit();
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
            <div className="mx-auto flex flex-col flex-start w-4/6 md:w-1/3 m-auto">
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
                            onKeyPress={(e) => {
                                enterPressed(e);
                            }}
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
                    <Button title={loginBtn.title} width={loginBtn.width} action={submit}/>
                </form>   
            </div>
        </div>
    )
};

export default Login;