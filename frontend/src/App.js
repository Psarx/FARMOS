// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct import
// import Home from './components/Assets/Signup/Home';
// import CropPrediction from './components/Assets/Signup/CropPrediction';
// import DiseaseDetection from './components/Assets/Signup/DiseaseDetection';
// import Login from './components/Assets/Signup/Login';

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/crop-prediction" element={<CropPrediction />} />
//                 <Route path="/disease-detection" element={<DiseaseDetection />} />
//             </Routes>
//         </Router>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Assets/Signup/Home';
import CropPrediction from './components/Assets/Signup/CropPrediction';
import DiseaseDetection from './components/Assets/Signup/DiseaseDetection';
import Login from './components/Assets/Signup/Login';
import Signup from './components/Assets/Signup/Login';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Show Login as the default page */}
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/crop-prediction" element={<CropPrediction />} />
                <Route path="/disease-detection" element={<DiseaseDetection />} />
                <Route path="/login" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;
