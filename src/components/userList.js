import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/users`)
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const handleUserAdded = (newUser) => {
    setUsers([...users, newUser]);
  };

  const handleUserDelete = (userId) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .then(() => {
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch(error => console.error('Error deleting user:', error));
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '1200px',
    margin: '20px auto'
  };

  const formStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    flexBasis: '35%',
    marginRight: '20px'
  };

  const listStyle = {
    backgroundColor: '#f3f4f6',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    flexBasis: '60%'
  };

  const listItemStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const buttonStyle = {
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#ff4d4f',
    color: 'white',
    cursor: 'pointer',
    marginLeft: '10px'
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <UserForm onUserAdded={handleUserAdded} />
      </div>
      <div style={listStyle}>
        <h2>User List</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {users.map(user => (
            <li key={user.id} style={listItemStyle}>
              {user.username} || {user.email}
              <button onClick={() => handleUserDelete(user.id)} style={buttonStyle}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
