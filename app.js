const express = require('express');

// express app

const app = express();

//Listen for a requests

app.listen(3000); // It automatically adds localhost, you can also store it in a variable

// respond to requests

app.get('/', (req, res) => {
  //res.send('<p>Hello, World!</p>')
  res.sendFile('/views/index.html', {root: __dirname})
})

app.get('/about', (req, res) => {
  res.sendFile('/views/about.html', {root: __dirname})
})

// redirects 

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page

app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname })
})