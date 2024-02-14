
// src/addPolicyWorker.js
/* eslint-disable-next-line no-restricted-globals */
self.onmessage = function (event) {
  const { type, data } = event.data;

  if (type === 'ADD_POLICY') {
    // Add the new policy to the list received from the main thread
    const existingPolicies = data.existingPolicies;
    const newPolicy = data.newPolicy;

    existingPolicies.push(newPolicy);

    // Send the updated list back to the main thread
    /* eslint-disable-next-line no-restricted-globals */
    self.postMessage(existingPolicies);
  }
};
