import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Loader from 'react-loader-spinner';
import { CameraIcon, XCircleIcon } from '@heroicons/react/outline';

const WebcamKTP = ({ scanKTP, loading }) => {
    const [image, setImage] = useState("");
    const [playing, setPlaying] = useState(false);

    const videoConstraints = {
        width: 400,
        height: 300,
        facingMode: "user",
    };

    const webcamRef = useRef(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        scanKTP(imageSrc, "webcam");
    },
        [webcamRef, scanKTP]
    );

    const toggleCamera = () => {
        setPlaying(!playing);
    };

    const enterPressed = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            capture();
        }
    };

    return (
        <div className="m-auto p-8 border border-gray-300 rounded-lg">
            <div>
                {
                (image === "" && playing) ? <Webcam 
                    audio={false} 
                    height={300} 
                    width={400} 
                    ref={webcamRef} 
                    screenshotFormat="image/jpeg" 
                    videoConstraints={videoConstraints}
                    className="mb-8 rounded-lg"
                /> : <img src={image} alt="" className="mb-8 bg-gray-100 rounded-lg" />
                }
            </div>
            <div className="flex flex-row gap-4 justify-center">
                <button className="primary-btn" onClick={toggleCamera}>
                    {playing ? (
                        <span className="flex flex-row items-center gap-2">
                        <XCircleIcon className="w-6" />
                        Close
                        </span>
                    ) : (
                        <span className="flex flex-row items-center gap-2">
                        <CameraIcon className="w-6" />
                        Open
                        </span>
                    )}
                </button>
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
                            {/* Capture */}
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
        </div>
    );
};

export default WebcamKTP;