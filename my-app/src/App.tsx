import React, { useState } from 'react';

import './App.css';
import API from './api/api';

function App() {

  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [newUser, setNewUser] = useState({ id: '', name: '', age: ''});
  const [createdUser, setCreatedUser] = useState<any>(null);
  const [userList, setUserList] = useState<any>(null);


  // Get All Users
  const fetchAllUsers = async () => {
    try {
      const response = await API.get(`/users`);
      console.log(response.data);

      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching user: ', error)
    }
  };

  // Get User by ID
  const fetchUser = async () => {
    try {
      const response = await API.get(`/users/${userId}`); //NOTE: If you want to feed in parameters to the url, use BACKTICKS (below esc key), not single quotes.
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user: ', error)
    }
  };

  // NOTE: This function is the same as the one below it. You can either send the request with a json in the data spot, 
  // as below, or by sending the data as args in the query string, one function lower.
  const createUserWithJson = async () => { 
    try {
      const response = await API.post('/users/json', newUser);
      setCreatedUser(response.data);
    } catch (error) {
      console.error("Error creating new user: ", error);
    }
  };

  const createUserWithArgs = async () => {
    try {
      const response = await API.post(`/users?id=${newUser.id}&name=${newUser.name}&age=${newUser.age}&gender=NotSpecified`);
      setCreatedUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error creating new user: ", error);
    }
  };

  // TO DO: Add the functions for the axios calls for any new endpoints you made 
  // in the flask file here!



  return (
    
    <div className="App">

      {/* Get All Users Section */}
      <div>
        <h3>Get All Users</h3>
        <button onClick={fetchAllUsers}>Get All Users</button>

        {/* Display results of API call */}
        { userList &&
          <div>
            <ul>
              {Object.values(userList).map((user: any) => (
                <li key={user.id}>
                  <p>
                    <strong>ID:</strong> {user.id},  
                    <strong> Name:</strong> {user.name},  
                    <strong> Age:</strong> {user.age}, 
                    <strong> Gender:</strong> {user.gender}
                  </p>
                </li>
              ))}
            </ul>
            
          </div>
        }
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

        {/* Display results of API call */}
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
          <div>
            <button onClick={createUserWithArgs}>Add User With Args</button>
            <button onClick={createUserWithJson}>Add User With Json</button>
          </div>
          
          {/* Display results of API call */}
          { createdUser &&
            <div>
              <p><strong>User Id:</strong> {createdUser.id}</p>
              <p><strong>Name:</strong> {createdUser.name}</p>
              <p><strong>Age:</strong> {createdUser.age}</p>
            </div>
          }
        </div>

      {/* Add any frontend customizations for other API calls here! */}

    </div>
  );
}

export default App;
