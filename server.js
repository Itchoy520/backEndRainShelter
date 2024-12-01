import express from "express"
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from "cors";
import corsOptions from "./config/corsOptions.mjs";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors(corsOptions));
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);  // Get the current file's URL and convert to a file path
const __dirname = dirname(__filename);  // Get the directory name

// Now you can join the path like before
const filePath = join(__dirname, 'wifi.txt'); 

// Function to read the value from a file
function getValue() {
    try {
        const data = fs.readFileSync('value.txt', 'utf8');
        return data;
    } catch (err) {
        return '0';  // Default to '0' if no file exists
    }
}

// Function to save the value to a file
function setValue(newValue) {
    // Only allow '1' or '0' as valid values
    if (newValue !== '1' && newValue !== '0') {
        throw new Error('Invalid value. Only "1" or "0" are allowed.');
    }

    // Check if the file exists, if not create it with the new value
    if (!fs.existsSync('value.txt')) {
        fs.writeFileSync('value.txt', newValue, 'utf8');  // Create the file with the new value
    } else {
        fs.writeFileSync('value.txt', newValue, 'utf8');  // Update the file with the new value
    }
}

// POST route to change the value
app.post('/change-value', (req, res) => {
    const newValue = req.body.newValue;
    
    if (newValue) {
        try {
            setValue(newValue);  // Persist the value in a file
            res.status(200).json({ newValue });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: 'No new value provided' });
    }
});

// GET route to view the current value
app.get('/current-value', (req, res) => {
    const value = getValue();  // Retrieve the value from the file
    res.status(200).json({ value });
});

function getWifi() {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data); // Assuming we save it as JSON
    } catch (err) {
        return { ssid: "", password: "" }; // Default values if no file exists
    }
}
// Function to save the value to a file
function setWifi(newSsid, newPassword) {
    const wifiData = {
        ssid: newSsid,
        password: newPassword,
    };

    fs.writeFileSync(filePath, JSON.stringify(wifiData), "utf8"); // Save as JSON
}

// POST route to change the value
app.post("/setWifi", (req, res) => {
    console.log("Request body:", req.body); // Log the request body

    const { ssid, password } = req.body;

    if (ssid && password) {
        try {
            setWifi(ssid, password); // Save both SSID and password
            res.status(200).json({ ssid, password });
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } else {
        res.status(400).json({ message: "SSID and Password are required" });
    }
});

// GET route to view the current value
app.get("/getWifi", (req, res) => {
    const wifiData = getWifi();
    res.status(200).json(wifiData);
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
