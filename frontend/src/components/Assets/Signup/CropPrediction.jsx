// // import React, { useState } from 'react';
// // import './CropPrediction.css';
// // import wheatImage from '../../Assets/Images/wheat.jpg';

// // const CropPrediction = () => {
// //     const [formData, setFormData] = useState({
// //         nitrogen: '',
// //         phosphorus: '',
// //         potassium: '',
// //         temperature: '',
// //         humidity: '',
// //         ph: '',
// //         rainfall: '',
// //         location: '',
// //     });

// //     const handleChange = (e) => {
// //         setFormData({
// //             ...formData,
// //             [e.target.name]: e.target.value,
// //         });
// //     };

// //     const handleSubmit = (e) => {
// //         e.preventDefault();
// //         alert('Predicting'); // Alert when the button is clicked
// //         console.log('Submitted Data:', formData);

// //         // Simulate an API call or database update
// //         alert('Crop Prediction data submitted successfully!');
// //     };

// //     return (
// //         <div className="container">
// //             <div className="main-container">
// //                 <div className="left-section">
// //                     <div className="header">
// //                         <div className="text">Crop Prediction</div>
// //                         <div className="underline"></div>
// //                     </div>
// //                     <form className="inputs" onSubmit={handleSubmit}>
// //                         {Object.keys(formData).map((key) => (
// //                             <div key={key} className="input">
// //                                 <input
// //                                     type="text"
// //                                     placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
// //                                     name={key}
// //                                     value={formData[key]}
// //                                     onChange={handleChange}
// //                                     required
// //                                 />
// //                             </div>
// //                         ))}
// //                         <div className="submit-container">
// //                             <button type="submit" className="submit">
// //                                 Predict Crop
// //                             </button>
// //                         </div>
// //                     </form>
// //                 </div>
// //                 <div className="right-panel">
// //                     <img src={wheatImage} alt="Wheat background" className="background-image" />
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default CropPrediction;


// import React, { useState } from 'react';
// import './CropPrediction.css';
// import wheatImage from '../../Assets/Images/wheat.jpg';

// const CropPrediction = () => {
//     const [formData, setFormData] = useState({
//         nitrogen: '',
//         phosphorus: '',
//         potassium: '',
//         temperature: '',
//         humidity: '',
//         ph: '',
//         rainfall: '',
//         location: '',
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Submitted Data:', formData);

//         // Simulate an API call or database update
//         alert('Crop Prediction and Recommendation data submitted successfully!');
//     };

//     return (
//         <div className="container">
//             <div className="main-container">
//                 <div className="left-section">
//                     <div className="header">
//                         <div className="text">Crop Prediction & Recommendation</div>
//                         <div className="underline"></div>
//                     </div>
//                     <form className="inputs" onSubmit={handleSubmit}>
//                         <div className="form-section">
//                             <div className="section-title">Soil and Weather Details</div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="Nitrogen (N)"
//                                     name="nitrogen"
//                                     value={formData.nitrogen}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="Phosphorus (P)"
//                                     name="phosphorus"
//                                     value={formData.phosphorus}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="Potassium (K)"
//                                     name="potassium"
//                                     value={formData.potassium}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="pH Level"
//                                     name="ph"
//                                     value={formData.ph}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-section">
//                             <div className="section-title">Environmental Conditions</div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="Temperature (°C)"
//                                     name="temperature"
//                                     value={formData.temperature}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="Humidity (%)"
//                                     name="humidity"
//                                     value={formData.humidity}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="Rainfall (mm)"
//                                     name="rainfall"
//                                     value={formData.rainfall}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="input">
//                                 <input
//                                     type="text"
//                                     placeholder="Location"
//                                     name="location"
//                                     value={formData.location}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="submit-container">
//                             <button type="submit" className="submit">
//                                 Recommend Crop
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//                 <div className="right-panel">
//                     <img src={wheatImage} alt="Wheat background" className="background-image" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CropPrediction;

import React, { useState } from 'react';

const CropPrediction = () => {
    const [formData, setFormData] = useState({
        nitrogen: '',
        phosphorus: '',
        potassium: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: '',
        location: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Data:', formData);

        // Simulate an API call or database update
        alert('Crop Prediction data submitted successfully!');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Crop Prediction</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                {Object.keys(formData).map((key) => (
                    <div key={key} style={styles.inputGroup}>
                        <label style={styles.label} htmlFor={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                        </label>
                        <input
                            type="text"
                            id={key}
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                ))}
                <button type="submit" style={styles.submitButton}>
                    Predict Crop
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '50px auto',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        backgroundColor: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    header: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '5px',
        fontWeight: 'bold',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        padding: '10px 15px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: 'orange',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        textAlign: 'center',
    },
};

export default CropPrediction;