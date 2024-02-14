// src/bootstrap.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

// Sample data for insurance details list
const sampleInsuranceDetailsList = [
  {
    policyNumber: '123456',
    policyHolder: 'John Doe',
    coverage: 'Health Insurance',
    // Add more fields as needed
  },
  {
    policyNumber: '789012',
    policyHolder: 'Charles',
    coverage: 'Auto Insurance',
    // Add more fields as needed
  },
];

// Store the sample data in local storage
localStorage.setItem('insuranceDetailsList', JSON.stringify(sampleInsuranceDetailsList));

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
