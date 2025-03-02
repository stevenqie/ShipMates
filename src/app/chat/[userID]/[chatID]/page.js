"use client";
import React, { useState, useEffect } from 'react';
import { storage, db } from '../../../lib/firebaseConfig.js'; // Adjust the path as needed
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { HStack, Flex } from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import InvoiceForm from './components/InvoiceForm.js'; // Import InvoiceForm
import TransactionDetails from './components/TransactionDetails.js'; // Import TransactionDetails
import ChatComponent from '@/components/ChatComponent.js';

// Replace with your actual function URL from Firebase Console
const functionUrl = "https://parseinvoice-tayv6iv37a-uc.a.run.app";

async function callParseInvoice(imageName) {
  try {
    const url = `${functionUrl}?image_name=${encodeURIComponent(imageName)}`;
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
  const [allowedUpload, setAllowedUpload] = useState(null);
  const [orderPending, setOrderPending] = useState(null);
  const [image, setImage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [invoiceData, setInvoiceData] = useState(null);

  // Get userID and chatID from params
  useEffect(() => {
    params.then(({ userID, chatID }) => {
      setUserID(userID);
      setChatID(chatID);
    });
  }, [params]);

  // Check if current user matches the hostID from chatMetadata and check order status from listings
  useEffect(() => {
    async function checkUser() {
      if (chatID && userID) {
        const chatDocRef = doc(db, "chatMetadata", chatID);
        const chatDoc = await getDoc(chatDocRef);
        if (chatDoc.exists()) {
          const data = chatDoc.data();
          // Render upload only if the current user is the host
          setAllowedUpload(data.hostID === userID);
          // Get listing status to check if order is pending
          const listingDocRef = doc(db, "listings", data.listingID);
          const listingDoc = await getDoc(listingDocRef);
          if (listingDoc.exists()) {
            const listingData = listingDoc.data();
            setOrderPending(listingData.status === "pending");
            console.log("Order pending:", listingData.status === "pending");
          } else {
            setOrderPending(false);
          }
        } else {
          setAllowedUpload(false);
        }
      }
    }
    checkUser();
  }, [chatID, userID]);

  const handleImageUpload = (event) => {
    if (!event) return;
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
              .then((result) => setInvoiceData(result))
              .catch((err) => console.error("Error:", err));
          });
        }
      );
    }
  };

  return (
    <HStack width="100vw" height="100vh" spacing={0}>
      <ChatComponent />
      <Flex width="50%" height="100%" p={8} justify="flex-end" direction="column">
        {/* If invoiceData is not set and user is allowed to upload, show the upload UI */}
        {(!invoiceData && allowedUpload) && (
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

        {/* Render InvoiceForm if invoiceData exists */}
        {invoiceData && userID && chatID && (
          <InvoiceForm invoiceData={invoiceData} userID={userID} chatID={chatID} />
        )}

        {/* If order is pending and current user is not allowed to upload, display TransactionDetails */}
        {(orderPending === true && allowedUpload === false) && (
          <TransactionDetails chatID={chatID} />
        )}
      </Flex>
    </HStack>
  );
};

export default Page;