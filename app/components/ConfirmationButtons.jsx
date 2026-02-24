// ConfirmationButtons.jsx
import React from 'react';
import { toast } from 'react-toastify';

const ConfirmationButtons = ({ closeToast, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    closeToast(); // Dismiss the toast after action
  };

  return (
    <div>
      <button onClick={handleConfirm}>Yes</button>
      {/* <button onClick={closeToast}>Cancel</button> */}
    </div>
  );
};

export default ConfirmationButtons;
