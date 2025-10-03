import React from 'react';
import './Home.css'; // You can reuse Home.css or create a new About.css

export default function About() {
  return (
    <div className="form-container"> {/* Reusing a common container style */}
      <h2>About Online Clipboard</h2>
      <div className="auth-form" style={{textAlign: 'left'}}> {/* Reusing form styling for content block */}
        <p>Welcome to Online Clipboard, your go-to solution for seamless text sharing across devices. 
           Our platform allows you to effortlessly copy text from one device and paste it onto another
           using a unique, short key. Whether you're transferring notes, code snippets, or important
           information, Online Clipboard makes it quick, secure, and intuitive.</p>
        <p>We prioritize your privacy and data security. All clips are temporary and automatically 
           expire after 2 minutes, ensuring your shared content doesn't linger indefinitely. 
           Simply generate a key, share it with your intended receiver, and retrieve your content 
           with ease. No more emailing yourself or struggling with fragmented copy-paste methods!</p>
        <p>Built with React, Express, and MongoDB, we aim to provide a robust and user-friendly experience.</p>
      </div>
    </div>
  );
}
