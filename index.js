const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Existing Adobo route
app.get('/adobo', async (req, res) => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Adobo');
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Adobo not found' });
    }
});

// ✅ Existing Nasi Lemak route
app.get('/nasi-lemak', async (req, res) => {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=Nasi%20Lemak');
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Nasi Lemak not found' });
    }
});

// ✅ NEW: OpenF1 API routes

// 1️⃣ Drivers route
app.get('/drivers', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/drivers');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Drivers not found' });
    }
});

// 2️⃣ Sessions route
app.get('/sessions', async (req, res) => {
    try {
        const response = await fetch('https://api.openf1.org/v1/sessions');
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Sessions not found' });
    }
});

// 3️⃣ Lap Times route (with driver_number parameter)
app.get('/laptimes/:driver_number', async (req, res) => {
    try {
        const { driver_number } = req.params;
        const response = await fetch(`https://api.openf1.org/v1/laps?driver_number=${driver_number}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lap times not found' });
    }
});

app.listen(3001, () => {
    console.log('Running in 3001');
});
