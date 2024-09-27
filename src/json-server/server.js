const express = require('express');
const fs = require('fs');  // To read the JSON file
const path = require('path');  // To work with file paths

const app = express();
const PORT = 8000;

// Route to get the JSON data from a file
app.get('/db', (req, res) => {
    // Path to the JSON file
    const jsonFilePath = path.join(__dirname, 'db.json');
    
    // Read the JSON file
    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading JSON file' });
        }
        // Parse and send the JSON data
        res.json(JSON.parse(data));
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
