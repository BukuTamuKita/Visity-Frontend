import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Loader from 'react-loader-spinner';
import Popup from '../../../components/Popup/Popup';
import { CameraIcon } from '@heroicons/react/outline';

const WebcamKTP = ({ scanKTP, loading }) => {
    const [image, setImage] = useState("");

    const dialogAttr = {
        detail: 'Open webcam',
    };

    const videoConstraints = {
        width: 400,
        height: 300,
        facingMode: 'user',
    };

    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        scanKTP(imageSrc, 'webcam');
    },
        [webcamRef, scanKTP]
    );

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            capture();
        }
    };

    return (
        <Popup icon={<CameraIcon className="w-6 h-6" />} attribute={dialogAttr}>
            <div>
                {(image === "") ? <Webcam 
                    audio={false} 
                    height={300} 
                    width={400} 
                    ref={webcamRef} 
                    screenshotFormat="image/jpeg" 
                    videoConstraints={videoConstraints}
                    className="mb-8 rounded-lg"
                /> : <img src={image} alt="" className="mb-8 bg-gray-100 rounded-lg" />}
            </div>
            <div className="flex flex-row gap-4 justify-center">
                <div>
                    {image !== "" ? 
                        <button 
                            className="primary-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                setImage("");
                            }}
                        >
                            {/* Retake Image */}
                            {loading ? (
                                <span className="flex justifty-center items-center">
                                    <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                                </span>
                            ) : (
                                <span>Retake Image</span>
                            )}
                        </button> 
                        : 
                        <button
                            className="primary-btn"
                            onClick={(e) => {
                                e.preventDefault();
                                capture();
                            }}
                            onKeyPress={(e) => {
                                enterPressed(e);
                            }}
                        >
                            {loading ? (
                                <span className="flex justifty-center items-center">
                                    <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                                </span>
                            ) : (
                                <span>Capture</span>
                            )}
                        </button>
                    }
                </div>
            </div>
        </Popup>
    );
};

export default WebcamKTP;