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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Assets/Signup/Home';
import CropPrediction from './components/Assets/Signup/CropPrediction';
import DiseaseDetection from './components/Assets/Signup/DiseaseDetection';
import Login from './components/Assets/Signup/Login';

 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/crop-prediction" element={<CropPrediction />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
            </Routes>
        </Router>
    );
};

export default App;
