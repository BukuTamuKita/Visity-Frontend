import React, { 
    useState, 
    useRef, 
    useCallback, 
    // Fragment 
} from "react";
import Webcam from "react-webcam";
import { SCAN_KTP } from "../../constants/urls";
import { getToken } from "../../utils/auth";
import axios from "axios";
// import { Dialog, Transition } from "@headlessui/react";

const ScanKTP = () => {
    const [playing, setPlaying] = useState(false);
    const [image, setImage] = useState("");
    // const [isOpen, setIsOpen] = useState(false);

    // function closeModal() {
    //     setIsOpen(false)
    // }
    // 
    // function openModal() {
    //     setIsOpen(true)
    // }

    const videoConstraints = {
        width: 400,
        height: 300,
        facingMode: "user",
    };

    const webcamRef = useRef(null);

    const dataURLtoFile = (url, filename) => {
        let arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type:mime});
    };

    const scanKTP = (photo) => {
        let file = dataURLtoFile(photo, "ktp");
        console.log("file photo: ", file);
        let formData = new FormData();

        formData.append("image", file);

        axios
            .post(SCAN_KTP, formData, {
                headers: { Authorization: `Bearer ${getToken()}` },
            })
            .then((res) => {
                console.log("KTP response: ", res);
            })
            .catch((err) => {
                console.log(err);
            })
    };

    const capture = useCallback(() => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImage(imageSrc);
            scanKTP(imageSrc);
        },
        [webcamRef]
    );

    const toggleCamera = () => {
        setPlaying(!playing);
    };

    return (
        <div className="flex h-screen">
            {/* <h1 className="m-auto">Testing page</h1> */}
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
                        {playing ? "Close" : "Open"}
                    </button>
                    <div>
                        {
                            image !== "" ? 
                            <button 
                                className="primary-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setImage("");
                                }}
                            >
                                Retake Image
                            </button> 
                            : 
                            <button
                                className="primary-btn" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    capture();
                                }}
                            >
                                Capture
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>

//         <>
//             <div className="fixed inset-0 flex items-center justify-center">
//                 <button
//                     type="button"
//                     onClick={openModal}
//                     className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//                 >
//                     Open dialog
//                 </button>
//             </div>
// 
//             <Transition appear show={isOpen} as={Fragment}>
//                 <Dialog
//                     as="div"
//                     className="fixed inset-0 z-10 overflow-y-auto"
//                     onClose={closeModal}
//                 >
//                     <div className="min-h-screen px-4 text-center">
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0"
//                             enterTo="opacity-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100"
//                             leaveTo="opacity-0"
//                         >
//                             <Dialog.Overlay className="fixed inset-0" />
//                         </Transition.Child>
// 
//                         {/* This element is to trick the browser into centering the modal contents. */}
//                         <span
//                             className="inline-block h-screen align-middle"
//                             aria-hidden="true"
//                         >
//                         &#8203;
//                         </span>
//                         <Transition.Child
//                             as={Fragment}
//                             enter="ease-out duration-300"
//                             enterFrom="opacity-0 scale-95"
//                             enterTo="opacity-100 scale-100"
//                             leave="ease-in duration-200"
//                             leaveFrom="opacity-100 scale-100"
//                             leaveTo="opacity-0 scale-95"
//                         >
//                             <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
//                                 <Dialog.Title
//                                     as="h3"
//                                     className="text-lg font-medium leading-6 text-gray-900"
//                                 >
//                                     Payment successful
//                                 </Dialog.Title>
//                                 <div className="mt-2">
//                                     <div>
//                                         {
//                                             (image === "" && playing) ? <Webcam 
//                                                 audio={false} 
//                                                 height={300} 
//                                                 width={400} 
//                                                 ref={webcamRef} 
//                                                 screenshotFormat="image/jpeg" 
//                                                 videoConstraints={videoConstraints}
//                                                 className="mb-8 rounded-lg"
//                                             /> : <img src={image} alt="" className="mb-8 bg-gray-100 rounded-lg" />
//                                         }
//                                     </div>
//                                     <div className="flex flex-row gap-4 justify-center">
//                                         <div>
//                                             {
//                                                 image !== "" ? 
//                                                 <button 
//                                                     className="primary-btn"
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         setImage("");
//                                                     }}
//                                                 >
//                                                     Retake Image
//                                                 </button> 
//                                                 : 
//                                                 <button
//                                                     className="primary-btn" 
//                                                     onClick={(e) => {
//                                                         e.preventDefault();
//                                                         capture();
//                                                     }}
//                                                 >
//                                                     Capture
//                                                 </button>
//                                             }
//                                         </div>
//                                     </div>
//                                 </div>
// 
//                                 <div className="mt-4">
//                                     <button
//                                         type="button"
//                                         className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
//                                         onClick={closeModal}
//                                     >
//                                         Got it, thanks!
//                                     </button>
//                                 </div>
//                             </div>
//                         </Transition.Child>
//                     </div>
//                 </Dialog>
//             </Transition>
//         </>
    );
};

export default ScanKTP;