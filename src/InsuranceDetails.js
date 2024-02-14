// src/InsuranceDetails.js
import React, { useState, useEffect } from 'react';

const InsuranceDetails = () => {
  const [insuranceDetails, setInsuranceDetails] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [newPolicyData, setNewPolicyData] = useState({
    policyHolder: '',
    policyNumber: '',
    coverage: '',
    // Add more fields as needed
  });

  useEffect(() => {
    // Retrieve insurance details list from session storage
    const storedInsuranceDetails = sessionStorage.getItem('insuranceDetailsList');

    if (storedInsuranceDetails) {
      // Parse the JSON string from session storage
      setInsuranceDetails(JSON.parse(storedInsuranceDetails));
    }
  }, []);

  const handlePolicyClick = (policy) => {
    // Set the selected policy for displaying details
    setSelectedPolicy(policy);
  };

  const addPolicy = (newPolicy) => {
    // Create a new web worker
    const worker = new Worker(new URL('./addPolicyWorker.js', import.meta.url));

    // Send a message to the web worker to add the policy
    worker.postMessage({ type: 'ADD_POLICY', data: { existingPolicies: insuranceDetails, newPolicy } });

    // Listen for the response from the web worker
    worker.onmessage = (event) => {
      // Update the local state with the updated policy list
      setInsuranceDetails(event.data);

      // Update session storage with the updated list
      sessionStorage.setItem('insuranceDetailsList', JSON.stringify(event.data));

      // Inform the user about the success
      alert('Policy added successfully');

      // Terminate the web worker
      worker.terminate();
    };
  };

  // Update the new policy data when user types in the input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewPolicyData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to add a new policy
  const handleAddPolicy = () => {
    // Call the addPolicy function with the new policy data

    if (!newPolicyData.policyHolder || !newPolicyData.policyNumber || !newPolicyData.coverage) {
      alert('All fields are required');
      return;
    }

    addPolicy(newPolicyData);
  };

  return (
    <div>
      <h2>Insurance Policies</h2>
      <table className="table">
        {/* Table headers */}
        <thead>
          <tr>
            <th>Policy Holder</th>
            <th>Policy Number</th>
            <th>Coverage</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {insuranceDetails.map((policy) => (
            <tr key={policy.policyNumber} onClick={() => handlePolicyClick(policy)}>
              <td>{policy.policyHolder}</td>
              <td>{policy.policyNumber}</td>
              <td>{policy.coverage}</td>
              <td>
                <button className="btn btn-primary">View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedPolicy && (
        <div>
          <h2>Details for Policy: {selectedPolicy.policyNumber}</h2>
          <p>Policy Holder: {selectedPolicy.policyHolder}</p>
          <p>Coverage: {selectedPolicy.coverage}</p>
          {/* Add more fields as needed */}
        </div>
      )}

      {/* Form to capture new policy data */}
      <hr />
      <div className='col-md-4 offset-md-4'>
        <div className="mt-4">
          <h2>Add New Policy</h2>
          <div className="mb-3">
            <label className="form-label">Policy Holder</label>
            <input
              type="text"
              className="form-control"
              name="policyHolder"
              value={newPolicyData.policyHolder}
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Policy Number</label>
            <input
              type="text"
              className="form-control"
              name="policyNumber"
              required
              value={newPolicyData.policyNumber}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Coverage</label>
            <input
              type="text"
              className="form-control"
              name="coverage"
              required
              value={newPolicyData.coverage}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more fields as needed */}
          <button onClick={handleAddPolicy} className="btn btn-success">
            Add New Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsuranceDetails;
