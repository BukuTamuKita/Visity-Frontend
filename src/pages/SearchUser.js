import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import MockData from '../Data2.json';

const SearchUser = () => {

    return (
        <div>
            <SearchBar placeholder="Cari nama..." data={MockData}/>
            
            <div className="flex flex-col items-center justify-center">
                <div className="card grid md:grid-cols-3 md:w-9/12 w-4/5">
                    <div className="left-card md:col-span-1 md:mx-2.5 mb-4 p-4 shadow-sm border border-solid border-current rounded-lg border-gray-300 text-center">
                        <p className="text-2xl">Santoso S. Santosi</p>
                        <p>Chief Executive Officer</p>
                    </div>
                    <div className="right-card md:col-span-2 md:mx-2.5 p-6 shadow-sm border border-solid border-current rounded-lg border-gray-300">
                        <p className="text-4xl">Meeting List</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchUser;