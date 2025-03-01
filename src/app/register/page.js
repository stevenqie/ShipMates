'use client'

import { useState } from "react";
import "./style.css";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function LoginForm({ className }) {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    zip: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validateInputs = () => {
    let newErrors = {};

    // Phone Number Validation: Must be exactly 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    // ZIP Code Validation: Exactly 5 digits
    const zipRegex = /^\d{5}$/;
    if (!zipRegex.test(formData.zip)) {
      newErrors.zip = "ZIP code must be exactly 5 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // True if no errors
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (validateInputs()) {
      const userData = { ...formData };
      setSubmittedData(userData);
      console.log("User Data JSON:", JSON.stringify(userData, null, 2));
      alert("Registration successful!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Strip out non-digit characters for the phone input
    if (name === "phone") {
      setFormData({ ...formData, [name]: value.replace(/\D/g, "") }); // Remove all non-digit characters
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={cn("flex flex-col gap-6", className)}>
        <form className="form" onSubmit={handleRegister}>
          <div className="flex-column">
            <label>Username</label>
          </div>
          <div className="inputForm">
            <input
              name="username"
              placeholder="Enter your Username"
              className="input placeholder-gray-500 text-black"
              type="text"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="flex-column">
            <label>First Name </label>
          </div>
          <div className="inputForm">
            <input
              name="firstName"
              placeholder="Enter your First Name"
              className="input placeholder-gray-500 text-black"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="flex-column">
            <label>Last Name</label>
          </div>
          <div className="inputForm">
            <input
              name="lastName"
              placeholder="Enter your Last Name"
              className="input placeholder-gray-500 text-black"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="flex-column">
            <label>Phone Number</label>
          </div>
          <div className="inputForm">
            <input
              name="phone"
              placeholder="Enter your 10-digit Phone Number"
              className="input placeholder-gray-500 text-black"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              maxLength="10" // Prevents input longer than 10 digits
            />
          </div>
          {errors.phone && <p className="text-red-500">{errors.phone}</p>}

          <div className="flex-column">
            <label>Zip Code</label>
          </div>
          <div className="inputForm">
            <input
              name="zip"
              placeholder="Enter your Zip Code"
              className="input placeholder-gray-500 text-black"
              type="text"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
          {errors.zip && <p className="text-red-500">{errors.zip}</p>}

          <button type="submit" className="button-submit">
            Register
          </button>
        </form>

        {submittedData && (
          <div className="mt-4 p-3 border rounded bg-gray-100">
            <h3 className="font-semibold">Submitted Data:</h3>
            <pre className="text-sm">{JSON.stringify(submittedData, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
