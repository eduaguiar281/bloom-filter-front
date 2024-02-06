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

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} || {user.email}
            <button onClick={() => handleUserDelete(user.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <UserForm onUserAdded={handleUserAdded} />
    </div>
  );
};
export default UserList;
