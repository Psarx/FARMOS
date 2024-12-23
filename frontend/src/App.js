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

import React from 'react';
import Home from './components/Assets/Signup/Home';

const App = () => {
    return (
        <div>
            <Home />
        </div>
    );
};

export default App;
