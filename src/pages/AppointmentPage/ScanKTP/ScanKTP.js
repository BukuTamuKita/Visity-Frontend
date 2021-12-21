import React, { useState } from 'react';
import axios from 'axios';
import WebcamKTP from './WebcamKTP';
import UploadKTP from './UploadKTP';
import { getToken } from '../../../utils/auth';
import { SCAN_KTP } from '../../../constants/urls';
import { dataURLtoFile } from '../../../utils/utility';

const ScanKTP = ({ setGuestInfo }) => {
    const [loadingCam, setLoadingCam] = useState(false);
    const [loadingUpload, setLoadingUpload] = useState(false);

    const scanKTP = (image, scanType) => {
        let file = null;
        
        if (scanType === 'webcam') {
            file = dataURLtoFile(image, 'ktp');
            setLoadingCam(true);
        } else if (scanType === 'upload') {
            file = image;
            setLoadingUpload(true);
        }
        
        let formData = new FormData();
        formData.append('image', file);

        axios
            .post(SCAN_KTP, formData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then(res => {
                setGuestInfo(res.data[0]);
                setLoadingCam(false);
                setLoadingUpload(false);
            })
            .catch(err => {
                console.log(err);
                setLoadingCam(false);
                setLoadingUpload(false);
            })
    };

    return (
        <div className="mb-6">
            <p className="md:font-bold md:text-lg font-semibold text-base pb-1">
                Please input your data
            </p>
            <label className="label">KTP Scan</label>
            <div className="flex flex-row items-center gap-2">
                <WebcamKTP scanKTP={scanKTP} loadingCam={loadingCam} />
                <p className="font-bold text-sm text-gray-700">or</p>
                <UploadKTP scanKTP={scanKTP} loadingUpload={loadingUpload} />
            </div>
        </div>
    );
};

export default ScanKTP;