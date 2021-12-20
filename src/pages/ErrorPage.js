import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/backgrounds/404.svg';

const ErrorPage = () => {
    const backButton = {
        content: "Back to home",
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto flex flex-col justify-center items-center">
                <img src={PageNotFound} alt="404" className="w-48 md:w-96 opacity-75 mb-6" />
                <h1 className="md:text-4xl text-xl font-medium text-gray-700 mb-12">Oops, page not found!</h1>
                <div>
                    <Link to="/">
                        <button className="outline-btn">
                            { backButton.content }
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;