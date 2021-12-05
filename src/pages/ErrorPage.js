import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const backButton = {
        content: "Back to home",
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto flex flex-col justify-center items-center">
                <h1 className="text-4xl font-light mb-12">Error 404 | Page Not Found</h1>
                <div>
                    <Link to="/">
                        <button>
                            { backButton.content }
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;