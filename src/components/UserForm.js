import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BloomFilterContainer from './BloomfilterContainer'
import BloomFilter from './BloomFilter';

const UserForm = ({ onUserAdded }) => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = 0;
    const bloomFilter = new BloomFilter(2000000, 10)
    const bits = await BloomFilterContainer.getBits();
    bloomFilter.setBitArray(bits);

    if (bloomFilter.contains(email)) {
      console.log(`Email ${email} já existe.`);
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/users`, { id, username, email })
        .then(response => {
          onUserAdded(response.data);
          setUsername('');
          setEmail('');
        })
        .catch(error => console.error('Error adding user:', error));
    }
  };

  const formStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto'
  };

  const inputStyle = {
    display: 'block',
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginBottom: '5px',
    display: 'block'
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  };

  return (
    <div style={formStyle}>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>
          Username:
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            style={inputStyle}
          />
        </label>
        <label style={labelStyle}>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle}>
          Add User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
