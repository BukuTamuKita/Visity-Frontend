import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import { SCAN_KTP } from '../constants/urls';


const Testing = () => {
    const handleKTPImage = (e) => {
        let file = e.target.files[0];
        scanKTP(file);
    };

    const scanKTP = (file) => {
        // setLoading(true);
        // let file = null;
        
        // if (scanType === "webcam") {
        //     file = dataURLtoFile(image, "ktp");
        // } else if (scanType === "upload") {
        //     file = image;
        //     console.log("file: " + file);
        // }
        
        console.log("file image: ", file);
        let formData = new FormData();

        formData.append("image", file);

        axios
            .post(SCAN_KTP, formData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                console.log("KTP response: ", res);
                // setGuestInfo(res.data[0]);
            })
            // .then((res) => {
            //     if (res) {
            //         setLoading(false);
            //     }
            //     setLoading(false);
            // })
            .catch((err) => {
                console.log(err);
                // setLoading(false);
            })
    }

    return (
        <div className="flex h-screen">
            {/* <h1 className="m-auto">Testing page</h1> */}
            <div className="m-auto">
                <input type="file" required onChange={handleKTPImage}/>
            </div>
        </div>
    );
}

export default Testing;