// import Button from '@mui/material/Button';
// import React, { useState } from 'react';
import React from 'react';
import Data from '../Data2.json';

// const Child = ({ parentToChild }) => {
//     return (
//         <div className="mb-8">
//             <p>{parentToChild}</p>
//         </div>
//     )
// }

const Testing = () => {
//     const [data, setData] = useState('');
// 
//     const parentToChild = () => {
//         setData("This is from parent (Testing page)");
//     }

// const people = [
//     {
//       name: 'Jane Cooper',
//       title: 'Regional Paradigm Technician',
//       department: 'Optimization',
//       role: 'Admin',
//       email: 'jane.cooper@example.com',
//       image:
//         'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     // More people...
// ]

    return (
//         <div className="flex flex-col justify-center items-center mt-64">
//             {/* <p className="text-4xl">For testing only...</p> */}
// 
//             <Child parentToChild={data} />
//             <Button 
//                 color="primary" 
//                 variant="contained" 
//                 onClick={() => parentToChild()}
//             >
//                 Click Parent
//             </Button>
//         </div>
    <>
    <div className="flex flex-col bg-red-100 py-2 w-4/5 mx-auto">
        <div className="py-2 bg-green-100">
            <div className="align-middle inline-block min-w-full bg-blue-100">
                <div className="shadow overflow- border-b border-gray-200 rounded-lg">
                    
                </div>
            </div>
        </div>
    </div>

    <table className="divide-y divide-gray-200 mx-auto w-4/5">
        <thead className="bg-yellow-100">
            <tr className="">
                <th
                    className="text-left text-xs font-medium text-gray-500 uppercase bg-red-400"
                >
                    Name
                </th>
                <th
                    className="text-left text-xs font-medium text-gray-500 uppercase bg-blue-400"
                >
                    Position
                </th>
                <th
                    className="text-left text-xs font-medium text-gray-500 uppercase bg-green-400"
                >
                    NIP
                </th>
                <th
                    className="text-left text-xs font-medium text-gray-500 uppercase bg-yellow-400"
                >
                    Action
                </th>
            </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
            {Data.map((person) => (
                <tr key={person.email} className="bg-gray-100">
                    <td className="flex flex-col">
                        <div className="font-medium text-gray-900">{person.name}</div>
                        <div className="text-gray-500">{person.email}</div>
                    </td>
                    <td className="text-gray-900">{person.position}</td>
                    <td className="text-gray-500">{person.nip}</td>
                    <td className="font-medium">
                        <a 
                            href="/#" 
                            className="text-indigo-600 hover:text-indigo-900"
                        >
                            Edit
                        </a>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </>
    );
}

export default Testing;
