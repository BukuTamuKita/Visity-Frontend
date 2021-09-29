import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import MockData from '../Data2.json';
import { Link } from 'react-router-dom';

const SearchUser = () => {

    return (
        <div>
            <SearchBar placeholder="Cari nama..." data={MockData}/>
            
            <div className="flex flex-col items-center justify-center">
                <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
                    <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
                        <p className="text-xl">Santoso S. Santoso</p>
                        <p className="text-2lg">Chief Executive Officer</p>
                    </div>
                    <div className="right-card md:col-span-2 md:mx-2.5 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300">
                        <p className="text-3xl">Meeting List</p>
                    </div>
                </div>
                <div className="mt-8 rounded text-center">
                        <Link 
                            className="px-4 py-2 rounded-md text-sm font-medium border-0 focus:outline-none focus:ring transition text-white bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:ring-purple-300" 
                            to="/appointment">
                            CONTINUE
                        </Link>
                    </div>
            </div>
        </div>
    );
}

export default SearchUser;