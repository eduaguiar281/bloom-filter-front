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

    if(bloomFilter.contains(email)){
      console.log(`Email ${email} já existe.`);
    } else{
      axios.post(`${process.env.REACT_APP_API_URL}/users`, { id, username, email })
      .then(response => {
        onUserAdded(response.data);
        setUsername('');
        setEmail('');
      })
      .catch(error => console.error('Error adding user:', error));
    }
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default UserForm;
