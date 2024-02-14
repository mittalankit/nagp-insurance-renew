// src/PolicyRenewal.js
import React, { useState, useEffect } from 'react';

const PolicyRenewal = () => {
  const [insuranceDetails, setInsuranceDetails] = useState([]);

  useEffect(() => {
    // Retrieve insurance details list from local storage
    const storedInsuranceDetails = localStorage.getItem('insuranceDetailsList');

    if (storedInsuranceDetails) {
      // Parse the JSON string from local storage
      setInsuranceDetails(JSON.parse(storedInsuranceDetails));
    }
  }, []);

  const renewPolicy = (policyNumber) => {
    // Find the policy to renew
    const policyToRenew = insuranceDetails.find((policy) => policy.policyNumber === policyNumber);

    if (policyToRenew) {
      // Update the policy expiry date by adding a year
      policyToRenew.expiryDate = policyToRenew.expiryDate? new Date(policyToRenew.expiryDate) : new Date() ;
      policyToRenew.expiryDate.setFullYear(policyToRenew.expiryDate.getFullYear() + 1);

      // Update the local state with the renewed policy list
      setInsuranceDetails((prevDetails) =>
        prevDetails.map((policy) =>
          policy.policyNumber === policyToRenew.policyNumber ? policyToRenew : policy
        )
      );

      // Update local storage with the renewed list
      localStorage.setItem('insuranceDetailsList', JSON.stringify(insuranceDetails));

      // Inform the user about the renewal
      alert(`Policy ${policyNumber} renewed successfully. New expiry date: ${policyToRenew.expiryDate}`);
    } else {
      // Handle error if policy is not found
      alert(`Policy ${policyNumber} not found.`);
    }
  };

  return (
    <div>
      <h2>Policy Renewal</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Policy Holder</th>
            <th>Policy Number</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {insuranceDetails.map((policy) => (
            <tr key={policy.policyNumber}>
              <td>{policy.policyHolder}</td>
              <td>{policy.policyNumber}</td>
              <td>{(policy.expiryDate)? policy.expiryDate.toDateString() : new Date().toDateString()}</td>
              <td>
                <button className="btn btn-primary" onClick={() => renewPolicy(policy.policyNumber)}>
                  Renew
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicyRenewal;
