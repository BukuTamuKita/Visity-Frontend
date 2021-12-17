import React from 'react';
import LoginBackground from '../../assets/backgrounds/login_bg';
import LoginForm from './LoginForm';

const LoginPage = () => {
    return (
        <>
            <div className="2xl:container 2xl:mx-auto md:grid md:grid-cols-12 h-screen mx-4 md:m-0 flex flex-col justify-center">
                <div className="md:relative md:col-span-6 flex flex-col justify-center">
                    <div className="flex flex-col sm:mx-12 lg:grid lg:grid-cols-4 lg:col-start-2">
                        <p className="md:col-start-2 md:col-span-2 text-2xl font-bold text-gray-700 mb-6">Welcome to <span className="text-primary">Visity</span></p>
                        <p className="text-sm text-gray-700 mb-6 md:col-start-2 md:col-span-2">Login to your account below.</p>
                        <LoginForm />
                    </div>
                    <p className="place-self-center mt-16 text-sm text-gray-400">@{ new Date().getFullYear() } Visity</p>
                </div>
                <div className="col-span-6 w-full h-screen hidden md:block">
                    <LoginBackground />
                </div>
            </div>
        </>
    )
};

export default LoginPage;