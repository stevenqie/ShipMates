"use client"
import ChatComponent from '@/components/ChatComponent';
import React, { useState } from 'react';

const Page = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ChatComponent/>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Upload Screenshot of Cart Details</h2>
        <div style={{ border: '2px solid #000', padding: '10px', borderRadius: '5px' }}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="fileInput"
            style={{ display: 'none' }}
          />
          <label
            htmlFor="fileInput"
            style={{
              backgroundColor: '#fff',
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '6px 12px',
              cursor: 'pointer',
              color: '#000'
            }}
          >
            Choose File
          </label>
        </div>
        {image && <img src={image} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%', maxHeight: '100%' }} />}
      </div>
    </div>
  );
};

export default Page;
