import React from 'react';
import './App.css';
import AddUserDetails from './components/addUserDetails';
import FetchUserData from './components/fetchUserDetails';

function App() {
  return (
    <div>
      <AddUserDetails/>
      <FetchUserData/>
    </div>
  );
}

export default App;
