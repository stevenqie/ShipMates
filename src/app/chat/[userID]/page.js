"use client"
import ChatComponent from '@/components/ChatComponent';
import React, { useState } from 'react';
import { storage } from '../../lib/firebaseConfig'; // Adjust the path as needed
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Replace with your actual function URL from Firebase Console
const functionUrl = "https://parseinvoice-tayv6iv37a-uc.a.run.app";
console.log("hello world")
async function callParseInvoice(imageName) {
  try {
    // Build the query parameter with image_name
    const url = `${functionUrl}?image_name=${encodeURIComponent(imageName)}`;

    // Make a GET request to your Cloud Function
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // Handle HTTP errors
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} - ${errorText}`);
    }

    // Parse the JSON response
    const data = await response.json();
    console.log("Parsed invoice data:", data);

    // Do something with the result...
    return data;
  } catch (error) {
    console.error("Error calling parseInvoice function:", error);
    throw error; // or handle the error in your UI
  }
}

const Page = () => {
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    console.log("image")
    if (file) {
      const storageRef = ref(storage, `invoices/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Upload failed', error);
        },
        () => {
          console.log('Upload successful');
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
            // Call the parseInvoice function here
            callParseInvoice(file.name)
              .then((result) => {
                console.log("Function result:", result);
              })
              .catch((err) => {
                console.error("Error:", err);
              });
          });
        }
      );
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
        {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
        {image && <img src={image} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '100%', maxHeight: '100%' }} />}
      </div>
    </div>
  );
};

export default Page;
