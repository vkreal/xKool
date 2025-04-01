// Requiring module
const express = require('express');
const axios = require('axios');
const {JSDOM} = require('jsdom');


// Creating express object
const app = express();

const url = "https://www.google.com";

let js = 'alert("test");';
let css = '';

// Handling GET request
app.get('/', async (req, res) => { 
    let string_html = await fetchGoogle();
    
    const dom = new JSDOM(string_html);
    const document = dom.window.document;

    let stylecontent;
    let scriptcontent;

    const imgs_tags =  document.getElementsByTagName('img');
    for(let i=0; i<imgs_tags.length; i++) {
        if(!imgs_tags[i].src.indexOf('http')) {
            continue;
        }
        if(imgs_tags[i].src.indexOf(url) === -1) {
            const has_slash = imgs_tags[i].src[0] === '/';
            if (has_slash) {
                imgs_tags[i].src = url + imgs_tags[i].src;
            }
            else {
                imgs_tags[i].src = url + "/" + imgs_tags[i].src
            }
            console.log(imgs_tags[i].src);
        }
    }
   
    const script_tags =  document.getElementsByTagName('script');
    for(let i=0; i<script_tags.length; i++) {
        if(!script_tags[i].src.indexOf('http')) {
            continue;
        }
        if(script_tags[i].src.indexOf(url) === -1 && script_tags[i].src !== "") {
            const has_slash = script_tags[i].src[0] === '/';
            if (has_slash) {
                script_tags[i].src = url + script_tags[i].src;
                scriptcontent = await cssjsfetch(script_tags[i].src);
                js = js + scriptcontent;
            }
            else {
                script_tags[i].src = url + "/" + script_tags[i].src;
                scriptcontent = await cssjsfetch(script_tags[i].src);
                js = js + scriptcontent;
            }
            console.log(script_tags[i].src);
        }
    }
    const css_tags = document.getElementsByTagName('link');
    for(let i=0; i<css_tags.length; i++) {
        if(!css_tags[i].href.indexOf('http')) {
            continue;
        }
        if(css_tags[i].href.indexOf(url) === -1 && css_tags[i].href !== "") {
            const has_slash = css_tags[i].href[0] === '/';
            if (has_slash) {
                css_tags[i].href = url + css_tags[i].href;
                stylecontent = await cssjsfetch(css_tags[i].src);
                css = css + scriptcontent;
            }
            else {
                css_tags[i].href = url + "/" + css_tags[i].href
                stylecontent = await cssjsfetch(css_tags[i].src);
                css = css + scriptcontent;
            }
            console.log(css_tags[i].href);
        }
    }
    res.send(
        dom.serialize() + 
        '<script>' + js + '</script>' +
        '<style>' + css + '</style>'
) 
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
        const response = await axios.get(url + "/");
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}
async function cssjsfetch(abslink) {
    try {
        const response = await axios.get(abslink);
        return response.data;
    } catch (error) {
        console.error('Error:', error.message);
    }
}