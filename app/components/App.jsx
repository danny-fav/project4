import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function FormApp() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger the custom toast
    toast((t) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>Form submitted!</span>
        <button
          onClick={() => {
            console.log("Confirmed by user");
            toast.dismiss(t.id); // Closes this specific toast
          }}
          style={{
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          OK
        </button>
      </div>
    ), {
      duration: 5000, // Stays for 5 seconds unless "OK" is clicked
      position: 'top-center',
    });
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
        <input type="text" placeholder="Enter name" required style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '8px', cursor: 'pointer' }}>
          Submit Form
        </button>
      </form>

      {/* This component renders the toasts on the screen */}
      <Toaster />
    </div>
  );
}
