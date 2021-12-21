import React from 'react';
import Loader from 'react-loader-spinner';
import { COLORS } from '../../../constants/colors';

const UploadKTP = props => {
    const { scanKTP, loadingUpload } = props;
    
    const handleKTPImage = e => {
        let file = e.target.files[0];
        scanKTP(file, 'upload');
    };
  
    return (
        <div className="py-2 md:text-sm text-xs">
            <label
                htmlFor="file-upload"
                className="cursor-pointer underline rounded-lg font-medium text-primary hover:text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
            >
                {loadingUpload ? (
                    <span className="flex justifty-center items-center">
                        <Loader type="Oval" radius={18} color={COLORS.primary} secondaryColor={COLORS.accent} height={24} width={24} />
                    </span>
                ) : (
                    <>
                        <span>Upload your KTP</span>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept=".jpg, .png, .jpeg"
                            onChange={(e) => handleKTPImage(e)}
                        />
                    </>
                )}
            </label>
        </div>
    );
};

export default UploadKTP;