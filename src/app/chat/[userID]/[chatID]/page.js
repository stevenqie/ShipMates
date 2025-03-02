"use client"
import React, { useState, useEffect } from 'react';
import { storage } from '../../../lib/firebaseConfig.js'; // Adjust the path as needed
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { HStack } from '@chakra-ui/react';
import InvoiceForm from './components/InvoiceForm.js'; // Import the new component

// Replace with your actual function URL from Firebase Console
const functionUrl = "https://parseinvoice-tayv6iv37a-uc.a.run.app";

async function callParseInvoice(imageName) {
  try {
    const url = `${functionUrl}?image_name=${encodeURIComponent(imageName)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Parsed invoice data:", data);
    return data;
  } catch (error) {
    console.error("Error calling parseInvoice function:", error);
    throw error;
  }
}

const Page = ({ params }) => {
  const [userID, setUserID] = useState(null);
  const [chatID, setChatID] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    params.then(({ userID, chatID }) => {
      setUserID(userID);
      setChatID(chatID);
    });
  }, [params]);

  const handleImageUpload = (event) => {
    if (!event) {
      return;
    }
    const file = event.target.files[0];
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImage(downloadURL);
            callParseInvoice(file.name)
              .then((result) => {
                setInvoiceData(result);
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
    <HStack>
      <div style={{ display: 'flex', height: '100vh' }}>
        <div style={{ flex: 1 }}></div>
        {!invoiceData && (
          <>
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
          </>
        )}
        {invoiceData && userID && chatID && (
          <InvoiceForm invoiceData={invoiceData} userID={userID} chatID={chatID} />
        )}
      </div>
    </HStack>
  );
};

export default Page;
