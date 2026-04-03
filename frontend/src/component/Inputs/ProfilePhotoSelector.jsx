import React, { useRef, useState } from 'react';
import { FaRegUser } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { MdUploadFile } from "react-icons/md";
const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  }
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  }
  const chooseFile = () => {
    inputRef.current.click();
  }

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
      <div className='w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center relative'>
        <FaRegUser className='text-primary text-3xl '/>
        <button
          type='button'
          className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center absolute bottom-0 right-0 border border-purple-300 shadow-md hover:bg-purple-300 cursor-pointer"
          onClick={chooseFile}
        >
          <MdUploadFile />
        </button>
      </div>
      ) : (
        <div className='relative '>
          <img 
          src= {previewUrl} 
          alt="Profile Photo"
          className='w-20 h-20 rounded-full object-cover border-2  shadow-md'
          />
          <button 
            type='button'
            className='w-8 h-8 flex justify-center items-center bg'
            onClick={handleRemoveImage}
          >
            <FaTrashAlt />
          </button>
        </div>
        )
      }
    </div>
  )
}

export default ProfilePhotoSelector;