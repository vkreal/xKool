// Requiring module
const express = require('express');
const axios = require('axios');
const {JSDOM} = require('jsdom');


// Creating express object
const app = express();

// Handling GET request
app.get('/', async (req, res) => { 
    let string_html = await fetchGoogle();
    const dom = new JSDOM(string_html);
    const document = dom.window.document;
    res.send(string_html) 
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
        const response = await axios.get('https://www.google.com/');
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}

function replaceRelativeCSS(html, baseUrl) {
    // Replace <link> href attributes
    html = html.replace(/<link\s+[^>]*href=["'](\/[^"']*)["']/gi, (match, path) => {
        return match.replace(path, baseUrl + path);
    });

    // Replace @import in <style> tags
    html = html.replace(/@import\s+url\(["']?(\/[^"'\)]*)["']?\)/gi, (match, path) => {
        return match.replace(path, baseUrl + path);
    });

    // Replace url() inside <style> or inline styles
    html = html.replace(/url\(["']?(\/[^"'\)]*)["']?\)/gi, (match, path) => {
        return match.replace(path, baseUrl + path);
    });

    return html;
}
