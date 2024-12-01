import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.mjs";


const app = express();
const PORT = 3000;

app.use(cors(corsOptions));


// Define an endpoint
app.get('/getvalue', (req, res) => {
    res.json({value: 1})
});

// Endpoint to toggle the LED State
app.post('/toggle', (req, res) => {
    ledState = ledState === 0 ? 1 : 0; // Toggle LED state
    res.json({ success: true, value: ledState });
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});