const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5000;

// Database Connection
const pool = new Pool({
    connectionString: 'postgresql://MainProject_owner:Q89rbOjImFDi@ep-rough-water-a5q7g77n.us-east-2.aws.neon.tech/MainProject?sslmode=require',
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Endpoint
app.post('/api/crop-prediction', async (req, res) => {
    const { nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall, location } = req.body;

    try {
        await pool.query(
            'INSERT INTO crop_data (nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall, location) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            [nitrogen, phosphorous, potassium, temperature, humidity, ph, rainfall, location]
        );
        res.status(200).json({ message: 'Data inserted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error inserting data.' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
