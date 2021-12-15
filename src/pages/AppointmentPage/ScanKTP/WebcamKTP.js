import React, { 
    useState, 
    useRef, 
    useCallback,
    useEffect, 
} from 'react';
import Webcam from 'react-webcam';
import Loader from 'react-loader-spinner';
import { Dialog } from '@mui/material';
import { CameraAltOutlined } from '@mui/icons-material';

const WebcamKTP = (props) => {
    const { scanKTP, loading } = props;
    const [image, setImage] = useState('');
    const [open, setOpen] = useState(false);
    const webcamRef = useRef(null);
    const [devices, setDevices] = useState([]);
    const [selectedDevice, setSelectedDevice] = useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setImage('');
        setSelectedDevice({});
    };

    const handleDevices = useCallback(
        mediaDevices => 
            setDevices(mediaDevices.filter(({ kind }) => kind === 'videoinput')),
        [setDevices]
    );

    useEffect(() => {
        navigator.mediaDevices.enumerateDevices().then(handleDevices);
    }, [handleDevices]);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImage(imageSrc);
        scanKTP(imageSrc, 'webcam');
    }, [webcamRef, scanKTP]);

    const enterPressed = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            capture();
        }
    };

    return (
        <>
            <button className="outline-btn" onClick={handleClickOpen}>
                <CameraAltOutlined />
                Open Webcam
            </button>
            <Dialog onClose={handleClose} open={open}>
                <div className="p-6">
                    <div>
                        {(image === "") ? (
                            <Webcam 
                                audio={false}
                                width={400}
                                height={200}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                className="rounded-lg" 
                                videoConstraints={{ deviceId: selectedDevice.deviceId }} />
                        ) : (<img src={image} alt="KTP" className="bg-gray-100 rounded-lg" />)}
                        <select 
                            name="selectCam" 
                            id="selectCam"
                            className="my-6 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            onChange={(e) => {
                                setSelectedDevice({ ...selectedDevice, deviceId: e.target.value })
                            }}
                        > 
                            {devices.map((device, key) => (
                                <option key={key} value={device.deviceId}>{ device.label }</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-row justify-center gap-4">
                        <button className="outline-btn" onClick={handleClose}>Close</button>
                        <div>
                            {image !== "" ? 
                                <button 
                                    className="primary-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setImage("");
                                    }}
                                >
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
                </div>
            </Dialog>
        </>
    );
};

export default WebcamKTP;