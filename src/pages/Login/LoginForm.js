import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { 
    AlternateEmailRounded, 
    LockOutlined, 
    WarningAmberRounded, 
    HighlightOffRounded 
} from '@mui/icons-material';
import { login } from '../../utils/auth';
import { COLORS } from '../../constants/colors';
import { LOGIN_API } from '../../constants/urls';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState({});
    const [visiblePass, setVisiblePass] = useState('password');
    const history = useHistory();

    const emailOnChange = e => {
        setEmail(e.target.value);

        if (e.target.value) {
            setErrorMessage('');
        }
    };

    const passwordOnChange = e => {
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
            .then(res => {
                login(res.data.token);
                setLoading(false);

                if (res.status === 200) {
                    history.push('/appointment-create');
                }
            })
            .catch(() => {
                clearFormFields();
                setErrorMessage({both: "Sorry, you're not authorized."});
                setLoading(false);
            });
    };

    const validateLogin = e => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let pass = document.getElementById('password').value;
    
        if (email === '' && pass === '') {
            setErrorMessage({both: 'Email and password cannot be blank.'});
        } else if (pass === '') {
            setErrorMessage({password: 'Password is required.'});
        } else if (email === '') {
            setErrorMessage({email: 'Email is required.'});
        } else {
            onLogin();
        }
    };

    const enterPressed = e => {
        if (e.key === 'Enter') {
            validateLogin(e);
        }
    };

    return (
        <form className="w-full col-start-2 col-span-2" onSubmit={validateLogin}>
            <div className="mt-1 mb-4 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <AlternateEmailRounded sx={{ color: "#9CA3AF" }} />
                </span>
                <input
                    className="text-gray-700 focus:ring-primary focus:border-primary flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                    id="email"
                    type="text"
                    value={email}
                    placeholder="Enter your email"
                    onChange={emailOnChange}
                />
            </div>
            {errorMessage.email && 
                <span className="flex flex-row gap-2 mt-2">
                    <WarningAmberRounded sx={{ color: COLORS.danger }} />
                    <p className="text-danger">{ errorMessage.email }</p>
                </span> 
            }
            <div className="col-span-3 sm:col-span-2 mb-4">
                <div className="mt-1 flex rounded-md shadow-sm">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                        <LockOutlined sx={{ color: "#9CA3AF" }} />
                    </span>
                    <input
                        className="text-gray-700 focus:ring-primary focus:border-primary flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        id="password"
                        type={visiblePass}
                        value={password}
                        placeholder="Enter your password"   
                        onChange={passwordOnChange}
                        onKeyPress={enterPressed}     
                    />
                </div>
                {errorMessage.password && 
                    <span className="flex flex-row gap-2 mt-2">
                        <WarningAmberRounded sx={{ color: COLORS.danger }} />
                        <p className="text-danger">{ errorMessage.password }</p>
                    </span> 
                }
            </div>
            <div className="flex items-start pb-6">
                <div className="flex items-center h-5">
                    <input id="comments" name="comments" type="checkbox" className="focus:ring-primaryFocus h-4 w-4 text-primary border-gray-300 rounded" onChange={onVisibleChange} />
                </div>
                <div className="ml-2 text-sm">
                    <label htmlFor="comments" className="text-gray-700 text-sm">
                        See Password
                    </label>
                </div>
            </div>
            {errorMessage.both && (
                <div className="flex flex-row items-center gap-2 mb-4 border p-4 rounded-lg bg-dangerShade">
                    <HighlightOffRounded sx={{ color: COLORS.danger }} />
                    <p className="text-danger">{ errorMessage.both }</p>
                </div>
            )}
            <button
                className="primary-btn w-full mt-6"
                type="submit"
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
    );
};

export default Login;