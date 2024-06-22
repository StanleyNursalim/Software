// proxy.mjs

import express from 'express'; // Import express only once
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy route
app.use('/proxy', async (req, res) => {
    const url = 'https://vision.foodvisor.io/api/1.0/en/analysis/';
    const response = await fetch(url, {
        method: req.method,
        headers: {
            'Authorization': req.headers.authorization,
            'Content-Type': req.headers['content-type']
        },
        body: req.method === 'GET' ? null : req.body
    });
    const data = await response.json();
    res.json(data);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
