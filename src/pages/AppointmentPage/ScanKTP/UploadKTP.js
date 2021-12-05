import React, { useState } from 'react';
import Loader from 'react-loader-spinner';

const UploadKTP = ({ scanKTP, loading }) => {
    const [image, setImage] = useState(null);
    const [isUploadSuccess, setIsUploadSuccess] = useState(false);

    const handleKTPImage = (e) => {
        let file = e.target.files[0];
        setImage(file);
        setIsUploadSuccess(true);
    };
  
    return (
        <>
        <label className="text-sm mb-1">Scan KTP</label>
        <div className="w-full h-52 rounded-lg border-2 border-dashed border-gray-300 col-span-4 flex flex-col justify-center items-center mb-6 bg-red-yellow-100">
            <div>
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                >
                    <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                    <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-lg font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                        <span>Upload a file</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".jpg, .png, .jpeg"
                            onChange={(e) => handleKTPImage(e)}
                        />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                </div>
                {isUploadSuccess ? (
                    <div>
                        <p className="text-xs text-gray-500 text-center">
                            Upload status: <strong>Succeed</strong>
                        </p>
                    </div>
                ) : (
                    <p className="text-xs text-gray-500 text-center">
                        PNG, JPG, GIF up to 10MB
                    </p>
                )}
            </div>
        </div>

        <div className="flex justify-end">
            <button
                className="secondary-btn"
                type="submit"
                onClick={() => {
                    scanKTP(image, "upload");
                    setIsUploadSuccess(false);
                }}
                disabled={loading ? true : false}
            >
                {loading ? (
                    <span className="flex justifty-center items-center">
                        <Loader className="mx-auto" type="Oval" color="#FFFFFF" height={24} width={24} />
                    </span>
                ) : (
                    <span>Scan</span>
                )}
            </button>
        </div>
        </>
    );
};

export default UploadKTP;