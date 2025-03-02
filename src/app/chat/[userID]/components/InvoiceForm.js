"use client"
import React, { useState, useEffect } from 'react';

const InvoiceForm = ({ invoiceData }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [taxesAndFees, setTaxesAndFees] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    // Initialize checked items state
    const initialCheckedItems = {};
    invoiceData.Items.forEach((item, index) => {
      initialCheckedItems[index] = true;
    });
    setCheckedItems(initialCheckedItems);
  }, [invoiceData]);

  useEffect(() => {
    // Calculate totals whenever checkedItems changes
    const checkedItemsArray = invoiceData.Items.filter((_, index) => checkedItems[index]);
    const newSubTotal = checkedItemsArray.reduce((sum, item) => sum + item[1], 0);
    const newTaxesAndFees = (newSubTotal / invoiceData["Sub total"]) * invoiceData["Taxes and fees"];
    console.log(newTaxesAndFees);
    const newGrandTotal = newSubTotal + newTaxesAndFees - Math.abs(invoiceData["Coupon savings"]);

    setSubTotal(newSubTotal);
    setTaxesAndFees(newTaxesAndFees);
    setGrandTotal(newGrandTotal);
  }, [checkedItems, invoiceData]);

  const handleCheckboxChange = (index) => {
    setCheckedItems((prevCheckedItems) => {
      const newCheckedItems = { ...prevCheckedItems, [index]: !prevCheckedItems[index] };
      return newCheckedItems;
    });
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Invoice Details</h3>
      <form>
        {invoiceData.Items.map((item, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={checkedItems[index] || false}
              onChange={() => handleCheckboxChange(index)}
            />
            <label>{item[0]} - ${item[1].toFixed(2)}</label>
          </div>
        ))}
        <div>
          <label>Coupon savings: ${invoiceData["Coupon savings"].toFixed(2)}</label>
        </div>
        <div>
          <label>Sub-total: ${subTotal.toFixed(2)}</label>
        </div>
        <div>
          <label>Taxes and fees: ${taxesAndFees.toFixed(2)}</label>
        </div>
        <div>
          <label>Grand total: ${grandTotal.toFixed(2)}</label>
        </div>
      </form>
    </div>
  );
};

export default InvoiceForm;