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

    const url = "https://www.google.com";

    const imgs_tags =  document.getElementsByTagName('img');
    for(let i=0; i<imgs_tags.length; i++) {
        if(imgs_tags[i].src.indexOf(url) === -1) {
            imgs_tags[i].src = url + imgs_tags[i].src;
            console.log(imgs_tags[i].src);
        }
    }
   
    const script_tags =  document.getElementsByTagName('script');
    for(let i=0; i<script_tags.length; i++) {
        if(script_tags[i].src.indexOf(url) === -1 && script_tags[i].src !== "") {
            script_tags[i].src = url + script_tags[i].src;
            console.log(script_tags[i].src);
        }
    }
    const css_tags = document.getElementsByTagName('link');
    for(let i=0; i<css_tags.length; i++) {
        if(css_tags[i].href.indexOf(url) === -1 && css_tags[i].href !== "") {
            css_tags[i].href = url + css_tags[i].href;
            console.log(css_tags[i].href);
        }
    }

    res.send(dom.serialize()) 
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
        const response = await axios.get("https://www.google.com/");
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}