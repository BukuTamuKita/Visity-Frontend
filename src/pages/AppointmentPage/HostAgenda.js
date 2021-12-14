import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { SHOW_USERS } from '../../constants/urls';
import { convertTime } from '../../utils/utility';
import { getToken } from '../../utils/auth';

const HostAgenda = ({ display, appointment, filteredHost }) => {
    const [users, setUsers] = useState({});
    
    useEffect(() => {
        axios
			.get(SHOW_USERS, {
				headers: { Authorization: `Bearer ${getToken()}` },
			})
			.then((res) => {
				setUsers(res.data.data);
			})
			.catch((err) => console.log(err));
        
        return () => {
            setUsers({});
        }
    }, []);

    return (        
        <div className="flex-initial">
            <div className="flex flex-col gap-4">
                {display ? (
                    <div className="p-6 flex-col bg-white rounded-lg shadow-lg">
                        <p className="text-xl text-primary font-bold mb-8">
                            Meeting Information
                        </p>
                        <div className="flex flex-row items-center gap-4 mb-6">
                            {users.map((user, index) => filteredHost.name === user.name && (
                                <div key={index}>
                                    <img src={user.photo} alt="Host" className="w-12 h-12 rounded-full" />
                                </div>
                            ))}
                            <div className="flex flex-col">
                                <p className="text-xl font-bold mb-1">
                                    {filteredHost.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {filteredHost.position}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 justify-between">
                            {appointment.length !== 0 ? (
                                appointment.map((data) => {
                                    return (
                                        <div
                                            className="flex flex-row justify-between gap-6"
                                            key={data.id}
                                        >
                                                <p className="text-sm font-semibold">{data.guest.name}</p>
                                                <p className="text-sm">
                                                    {convertTime(data.date_time[0], data.date_time[1])}
                                                </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div>
                                    <p className="text-center text-gray-700">No appointments yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="p-6 text-gray-700 flex-col rounded-lg shadow-lg flex flex-col justify-center items-center bg-white">
                        <p className="font-semibold">
                            No Host Selected
                        </p>
                        <p>Please find your host</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HostAgenda;