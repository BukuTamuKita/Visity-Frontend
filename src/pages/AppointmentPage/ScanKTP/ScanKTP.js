import React, { useState } from 'react';
import { SCAN_KTP } from '../../../constants/urls';
import { getToken } from '../../../utils/auth';
import axios from 'axios';
import { dataURLtoFile } from '../../../utils/utility';
import WebcamKTP from './WebcamKTP';
import UploadKTP from './UploadKTP';

const ScanKTP = () => {
    const [loading, setLoading] = useState(false);

    const scanKTP = (image, scanType) => {
        setLoading(true);
        let file = null;
        
        if (scanType === "webcam") {
            file = dataURLtoFile(image, "ktp");
        } else if (scanType === "upload") {
            file = image;
            console.log("file: " + file);
        }
        
        console.log("file image: ", file);
        let formData = new FormData();

        formData.append("image", file);

        axios
            .post(SCAN_KTP, formData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                console.log("KTP response: ", res);
            })
            .then((res) => {
                if (res) {
                    setLoading(false);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            })
    };

    return (
        <>
            <WebcamKTP scanKTP={scanKTP} loading={loading} />
            <UploadKTP scanKTP={scanKTP} loading={loading} />
        </>
    );
};

export default ScanKTP;