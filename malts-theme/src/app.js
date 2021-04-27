// src/App.js

import React from 'react';
import NavBar from './components/NavBar';
import { useAuth0 } from './utils/auth0-wrapper';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
    </div>
  );
}

export default App;
