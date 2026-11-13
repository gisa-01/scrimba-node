const express = require('express');

// express app

const app = express();

// register view engine
app.set('view engine', 'ejs')

//Listen for a requests

app.listen(3000); // It automatically adds localhost, you can also store it in a variable

// respond to requests

app.get('/', (req, res) => {
  //res.send('<p>Hello, World!</p>')
  res.render('index')
})

app.get('/about', (req, res) => {
  res.render('about')
})

// redirects 

app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 page

app.use((req, res) => {
  res.status(404).render('404')
})