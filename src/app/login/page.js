"use client";
import { checkUser } from "../lib/checkUser";
import { useEffect, useState } from "react";
import Script from "next/script";
import {jwtDecode} from "jwt-decode"; // Import JWT decoding library
import { useRouter } from 'next/navigation';
import { Router } from "next/router";

export default function LoginForm({ className }) {
  const [userEmail, setUserEmail] = useState(null);
  const router = useRouter();
  async function handleCredentialResponse(response) {
    const token = response.credential; // Google JWT Token
    const decoded = jwtDecode(token); // Decode JWT
    console.log("Decoded Google Response:", decoded);
    setUserEmail(decoded.email); // Extract email
    const zip = await checkUser(decoded.email);
    console.log(zip);
    if (zip == 0) {
      router.push(`/register?email=${encodeURIComponent(decoded.email)}&pfp=${encodeURIComponent(decoded.picture)}`);
    } else {
      const zippy = JSON.parse(zip)
      router.push(`/view/${zippy}`);
    }
    
  }

  function handleLoginClick() {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '946410029671-chhtav0s9b4k4duidtubjb3fi0bd2qpm.apps.googleusercontent.com',
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.prompt(); // Show the Google Sign-In prompt
    }
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      
      <div className="flex items-center justify-center min-h-screen">
        <div className={`flex flex-col gap-6 ${className}`}>
          <button
            onClick={handleLoginClick}
            className="flex items-center gap-2 border px-4 py-2 rounded-md shadow-md"
          >
            <img
              src="https://www.vectorlogo.zone/logos/google/google-icon.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>

          {userEmail && <p>Logged in as: {userEmail}</p>}
        </div>
      </div>
    </>
  );
}
