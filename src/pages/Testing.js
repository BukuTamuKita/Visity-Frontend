import Button from '@mui/material/Button';
import React, { useState } from 'react';

const Child = ({ parentToChild }) => {
    return (
        <div className="mb-8">
            <p>{parentToChild}</p>
        </div>
    )
}

const Testing = () => {
    const [data, setData] = useState('');

    const parentToChild = () => {
        setData("This is from parent (Testing page)");
    }

    return (
        <div className="flex flex-col justify-center items-center mt-64">
            {/* <p className="text-4xl">For testing only...</p> */}

            <Child parentToChild={data} />
            <Button 
                color="primary" 
                variant="contained" 
                onClick={() => parentToChild()}
            >
                Click Parent
            </Button>
        </div>
    );
}

export default Testing;
