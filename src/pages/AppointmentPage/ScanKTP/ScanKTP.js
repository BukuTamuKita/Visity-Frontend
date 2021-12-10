import React, { useState } from 'react';
import { SCAN_KTP } from '../../../constants/urls';
import { getToken } from '../../../utils/auth';
import axios from 'axios';
import { dataURLtoFile } from '../../../utils/utility';
import WebcamKTP from './WebcamKTP';
import UploadKTP from './UploadKTP';

const ScanKTP = ({ setGuestInfo }) => {
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
                setGuestInfo(res.data[0]);
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
        <div className="mb-6">
            <p className="text-2xl text-gray-700 font-bold mb-4">Please input your data</p>
            <label className="label">KTP Scan</label>
            <div className="flex flex-row items-center gap-2">
                <WebcamKTP scanKTP={scanKTP} loading={loading} />
                <p className="font-bold text-sm text-gray-700">or</p>
                <UploadKTP scanKTP={scanKTP} loading={loading} />
            </div>
        </div>
    );
};

export default ScanKTP;