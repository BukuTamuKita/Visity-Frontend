import React, { useEffect, useRef } from 'react';

export const Checkbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate]);

    return (
        <>
            <input 
                type="checkbox" 
                ref={resolvedRef} 
                {...rest} 
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
        </>
    )
});