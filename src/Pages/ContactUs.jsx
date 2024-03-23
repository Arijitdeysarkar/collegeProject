// ContactUs.js

import React from 'react';
import { FaUser, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const ContactUs = () => {
  const history = useHistory();

  return (
    // <div className='container-fluid' style={{height:'100%'}} id='trail'>
    <div style={styles.container}>
      <h2>Contact Us</h2>
      <p>Feel free to reach out to us for any inquiries or information.</p>
      <form style={styles.form}>
        <label>
          <FaUser style={styles.icon} />
          <input type="text" name="name" placeholder="Your Name" style={styles.input} />
        </label>
        <label>
          <FaEnvelope style={styles.icon} />
          <input type="email" name="email" placeholder="Your Email" style={styles.input} />
        </label>
        <label>
          <FaPaperPlane style={styles.icon} />
          <textarea name="message" placeholder="Your Message" style={styles.textarea} />
        </label>
        <button type="submit" 
              onClick={() =>
                {
                history.push("/")
                }}
              style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
    // </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: 'auto',
    padding: '20px',
    textAlign: 'center',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    marginTop:'10vh'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    width: '100%',
  },
  textarea: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '100px',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  icon: {
    marginRight: '8px',
  },
};

export default ContactUs;
