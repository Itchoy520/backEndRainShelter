import express from "express";
import cors from "cors";
import corsOptions from "./config/corsOptions.mjs";


const app = express();
const PORT = 3000;
let ledState = 0;

app.use(cors(corsOptions));


// Define an endpoint
app.get('/onToggle', (req, res) => {
    res.json({value: 1})
});

// Endpoint to toggle the LED State
app.post('/offToggle', (req, res) => {
    res.json({ value: 0});
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});