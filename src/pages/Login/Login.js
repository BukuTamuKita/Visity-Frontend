import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { AtSymbolIcon, LockClosedIcon, XCircleIcon } from '@heroicons/react/outline';
import { login } from '../../utils/auth';
import { LOGIN_API } from '../../constants/urls';

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visiblePass, setVisiblePass] = useState('password');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const emailOnChange = (e) => {
        setEmail(e.target.value);

        if (e.target.value) {
            setErrorMessage('');
        }
    };

    const passwordOnChange = (e) => {
        setPassword(e.target.value);

        if (e.target.value) {
            setErrorMessage('');
        }
    };

    const clearFormFields = () => {
        setEmail('');
        setPassword('');
    };

    const onVisibleChange = () => {
        if (visiblePass === 'password') {
            setVisiblePass('text');
        } else {
            setVisiblePass('password');
        }
    };

    const onLogin = () => {
        setLoading(true);
        axios
            .post(LOGIN_API, {
                email: email,
                password: password,
            })
            .then((res) => {
                console.log(res);
                login(res.data.token);
                setLoading(false);
                props.history.push('/appointment-create');
            })
            .catch(() => {
                clearFormFields();
                setErrorMessage("Sorry, you're not authorized.");
                setLoading(false);
            });
    };

    const validateLogin = (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
    
        if (email === '' && pass === '') {
            setErrorMessage('Email and password cannot be blank.');
        } else if (pass === '') {
            setErrorMessage('Password is required.');
        } else if (email === '') {
            setErrorMessage('Email is required.');
        } else {
            onLogin();
        }
    };

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            validateLogin(e);
        }
    };

    return (
        <div className="flex h-screen bg-blue-100">
            <div className="bg-white rounded-lg shadow-lg mx-auto flex flex-col flex-start m-auto p-8 w-full xl:w-4/12 lg:w-2/5 md:w-2/4 sm:w-3/4">
                <div className="flex flex-col justify-center items-center mb-8">
                    <h2 className="mb-1 text-xl text-primary font-bold">Welcome To Visity</h2>
                    <p className="mb-1 text-lg text-primary">Create your appointment today!</p>
                    <p className="mb-1 text-lg text-gray-400">Enter your credentials to access your account.</p>
                </div>
                <form>
                    <div className="col-span-3 sm:col-span-2 mb-4">
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <AtSymbolIcon className="w-6 h-6 text-gray-400" />
                            </span>
                            <input
                                className="focus:ring-primary focus:border-primary flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                id="email"
                                type="text"
                                value={email}
                                placeholder="Enter your company email"
                                onChange={emailOnChange}
                            />
                        </div>
                    </div>
                    <div className="col-span-3 sm:col-span-2 mb-4">
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                <LockClosedIcon className="w-6 h-6 text-gray-400" />
                            </span>
                            <input
                                className="focus:ring-primary focus:border-primary flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                id="password"
                                type={visiblePass}
                                value={password}
                                placeholder="Enter your password"   
                                onChange={passwordOnChange}
                                onKeyPress={enterPressed}     
                            />
                        </div>
                    </div>
                    <div className="flex items-start mb-8">
                        <div className="flex items-center h-5">
                            <input id="comments" name="comments" type="checkbox" className="focus:ring-primaryFocus h-4 w-4 text-primary border-gray-300 rounded" onChange={onVisibleChange} />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="comments" className="text-gray-600">
                                View Password
                            </label>
                        </div>
                    </div>
                    {errorMessage && (
                        <div className="flex flex-row items-center gap-2 mb-4 border p-4 rounded-lg bg-dangerShade">
                            <XCircleIcon className="w-6 h-6 text-danger" />
                            <p className="text-danger">{ errorMessage }</p>
                        </div>
                    )}
                    <button
                        className="primary-btn w-full"
                        onClick={validateLogin}
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="flex justifty-center items-center">
                                <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                            </span>
                        ) : (
                            <span>Sign in</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;