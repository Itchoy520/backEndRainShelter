const express =require('express');
const app = express();
const port = 3000;

// Define an endpoint
app.get('/getvalue', (req, res) => {
    res.json({value: 1})
});

// Start the server
app.listen(port, () => {
    console.log('Server is running at http://localhost:${port}');
});