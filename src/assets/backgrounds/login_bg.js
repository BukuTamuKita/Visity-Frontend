import React from 'react';
import UpperBlob from './upper_blob.svg';
import LowerBlob from './lower_blob.svg';
import Devices from './devices.png';
import { logoLight } from '../logo/index';

const LoginBackground = () => {
    return (
        <>
            <div className="relative w-full h-screen bg-gradient-to-br from-primary to-primary-900 rounded-l-3xl">
                <img src={UpperBlob} className="absolute top-0 right-0 md:w-3/4 lg:w-11/12 xl:w-4/5" />
                <div className="absolute top-1/2 transform -translate-y-1/2 md:mx-10 lg:mx-20">
                    <div className="flex flex-col">
                        <p className="text-2xl font-bold text-white mb-8">Making Appointment <br></br>Has Never Been Easier.</p>
                        <p className="text-white mb-8 font-medium">Visity is a digital guestbook application that featured with ID/KTP Scanner
                        <br></br>Visity will make you easier to make an appointment. </p>
                        <img src={Devices} className="place-self-center md:w-52 lg:w-72" />
                    </div>
                </div>
                <img src={logoLight} className="absolute bottom-0 right-0 w-8 h-8 mr-8 mb-8" />
                <img src={LowerBlob} className="absolute bottom-0 left-0 md:w-3/4 lg:w-11/12 xl:w-4/5 rounded-bl-2xl" />
            </div>
        </>
    );
};

export default LoginBackground;