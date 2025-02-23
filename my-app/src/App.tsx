import React, { useState } from 'react';

import logo from './logo.svg';
import './App.css';
import API from './api/api';

function App() {

  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [newUser, setNewUser] = useState({ id: '', name: '', age: ''})

  // Get User by ID
  const fetchUser = async () => {
    try {
      console.log("trying to fetch");
      const response = await API.get(`/users/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user: ', error)
    }
  };

  const createUser = async () => {
    try {
      await API.post('/users', newUser);

    } catch (error) {
      console.error("Error creating new user: ", error);
    }
  };

  const createUserWithArgs = async () => {
    try {
      await API.post(`/users/?id=${newUser.id}&name=${newUser.name}&age=${newUser.age}&gender=NotSpecified`, newUser);

    } catch (error) {
      console.error("Error creating new user: ", error);
    }
  };



  return (
    
    <div className="App">
      <div>
        <button onClick={() => {console.log("hi")}}>hi button</button>
      </div>
      {/* Fetch User by Id Section */}
      <div>
        <h3>Get User By ID</h3>
        <input 
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}  
        />
        <button onClick={fetchUser}>Fetch User</button>
        { userData &&
          <div>
            <p><strong>User:</strong> {userData.name}</p>
            <p><strong>Age:</strong> {userData.age}</p>
          </div>
        }
      </div>

      {/* Add User Section */}
      <div>
          <h3>Add New User</h3>
          <input
            type="text"
            placeholder="ID"
            onChange={(e) => setNewUser({ ...newUser, id: e.target.value })}
          />
          <input
            type="text"
            placeholder="Name"
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Age"
            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
          />
          <button onClick={createUserWithArgs}>Add User</button>
        </div>

    </div>
  );
}

export default App;
