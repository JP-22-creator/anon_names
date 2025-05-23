const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());              // Allow cross-origin requests
app.use(express.json());      // Parse JSON bodies

// In-memory storage
let names = ["Malle", "Japhy"];

// Routes
app.get('/names', (req, res) => {

    res.json(names);
});

app.post('/names', (req, res) => {
    const { name } = req.body;
    if (!name || typeof name !== 'string') {
        return res.status(400).json({ success: false, message: 'Invalid name' });
    }

    names.push(name);
    res.status(201).json({ success: true });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
