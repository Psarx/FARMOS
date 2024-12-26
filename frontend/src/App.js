// import React, { useState } from 'react';
// import Signup from './components/Assets/Signup/Signup';
// import Login from './components/Assets/Signup/Login';

// const App = () => {
//     const [currentPage, setCurrentPage] = useState('signup');

//     return (
//         <div>
//             <nav>
//                 <button onClick={() => setCurrentPage('signup')}>Signup</button>
//                 <button onClick={() => setCurrentPage('login')}>Login</button>
//             </nav>
//             <main>
//                 {currentPage === 'signup' ? <Signup /> : <Login />}
//             </main>
//         </div>
//     );
// };

// export default App;

// import React from 'react';
// import Home from './components/Assets/Signup/Home';

// const App = () => {
//     return (
//         <div>
//             <Home />
//         </div>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Assets/Signup/Login';
import Signup from './components/Assets/Signup/Signup';
import Home from './components/Assets/Signup/Home'; // Create this component

const App = () => {
  const [user, setUser ] = React.useState(null);

  const handleLogin = (userData) => {
    setUser (userData);
  };

  const handleLogout = () => {
    setUser (null);
  };

  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={user ? <Home user={user} onLogout={handleLogout} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;