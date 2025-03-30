// Requiring module
const express = require('express');
const axios = require('axios');


// Creating express object
const app = express();

// Handling GET request
app.get('/', async (req, res) => { 
    let test = await fetchGoogle();
    res.send(test) 
    res.end() 
});

app.get('/dad_is_super_cool', async (req, res) => { 
    res.send('A dad_is_super_cool Node App is '
        + 'running on this server') 
    res.end() 
});

app.get('/dad_is_super_cool2', async (req, res) => { 
    res.send('A dad_is_super_cool Node App is '
        + 'running on this server') 
    res.end() 
});

// Port Number
const PORT = process.env.PORT || 5500;

// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));

async function fetchGoogle() {
    try {
        const response = await axios.get('https://www.google.com');
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}