import React, { useState } from 'react';
import AddUserDetails from './components/addUserDetails';
import FetchUserDetails from './components/fetchUserDetails';


function App() {
  const [shouldFetch, setShouldFetch] = useState(false);

  const handleDataAdded = () => {
      setShouldFetch(prev => !prev); // Toggle fetch state
  };

  return (
      <div>
          <AddUserDetails onDataAdded={handleDataAdded} />
          <FetchUserDetails shouldFetch={shouldFetch} />
      </div>
  );
}

export default App;