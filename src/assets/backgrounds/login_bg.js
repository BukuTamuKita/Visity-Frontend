import React from 'react';
import UpperBlob from './upper_yellow_blob.svg';
import LowerBlob from './lower_yellow_blob.svg';
import Devices from './devices.png';
import { logoLight } from '../logo/index';

const LoginBackground = () => {
    return (
        <>
            <div className="relative w-full h-screen bg-gradient-to-br from-primary to-primary-900 rounded-l-3xl flex">
                <img
                    src={UpperBlob}
                    alt="top_blob"
                    className="absolute top-0 right-0 md:w-3/4 lg:w-11/12 xl:w-4/5"
                />
                <div className="flex justify-center items-center m-auto mx-9 w-full">
                        <div className="flex flex-col">
                            <p className="xl:text-4xl text-2xl font-bold text-white mb-8">
                                Making Appointment <br></br>Has Never Been
                                Easier.
                            </p>
                            <p className="xl:text-xl text-white mb-8 font-medium justify-center">
                                Visity is a digital guestbook application that
                                featured with ID/KTP Scanner that will 
                                help you make an appointment easier than before.{" "}
                            </p>
                            <img
                                src={Devices}
                                alt="devices"
                                className="place-self-center md:w-52 lg:w-72"
                            />
                        </div>
                </div>
                <img
                    src={logoLight}
                    alt="logo_light"
                    className="absolute bottom-0 right-0 w-8 h-8 mr-8 mb-8"
                />
                <img
                    src={LowerBlob}
                    alt="bottom_blob"
                    className="absolute bottom-0 left-0 md:w-3/4 lg:w-11/12 xl:w-4/5 rounded-bl-2xl"
                />
            </div>
        </>
    );
};

export default LoginBackground;