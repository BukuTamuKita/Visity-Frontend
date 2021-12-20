import React from 'react';
import LoginForm from './LoginForm';
import LoginBackground from '../../assets/backgrounds/login_bg';

const LoginPage = () => {
    return (
        <div className="2xl:mx-auto md:grid md:grid-cols-12 h-screen mx-4 md:m-0 flex flex-col justify-center">
            <div className="md:relative md:col-span-6 flex flex-col justify-center">
                <div className="flex flex-col sm:mx-12 lg:grid lg:grid-cols-4 lg:col-start-2">
                    <p className="md:col-start-2 md:col-span-2 text-2xl font-bold text-gray-700 mb-4 xl:text-4xl">
                        Welcome to <span className="text-primary">Visity</span>
                    </p>
                    <p className="text-sm text-gray-700 mb-6 md:col-start-2 md:col-span-2">
                        Login to your account below.
                    </p>
                    <LoginForm />
                </div>
                <p className="place-self-center mt-16 text-sm text-gray-400">@{ new Date().getFullYear() } Visity</p>
            </div>
            <div className="col-span-6 w-full h-screen inset-y-0 right-0 hidden md:block">
                <LoginBackground />
            </div>
        </div>
    )
};

export default LoginPage;