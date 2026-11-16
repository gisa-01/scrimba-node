const express = require("express");
const morgan = require('morgan')
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app

const app = express();

// connect to mongoDB

const dbURI = 'mongodb+srv://gisa-1:test1234@cluster0.vvv6tij.mongodb.net/node-tuts';
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// register view engine
app.set("view engine", "ejs");

//Listen for a requests

 // It automatically adds localhost, you can also store it in a variable

// middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog2',
    snippet: 'About my new blog',
    body: 'More about my blog'
  });
  blog.save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    })
})

// Retrieve all data from db/collection
app.get('/all-blogs', (req, res) => {
  Blog.find()
   .then((result) => {
      res.send(result);
   })
   .catch((err) => {
     console.log(err);
   })
})

// Retrieving a single blog
app.get('/single-blog', (req, res) =>{
  Blog.findById('6afabd68f24ee8e8d4a9bf92')
    .then((result) => {
      res.send(result);
    }) 
    .catch((err) => {
      console.log(err);
    })
})


// respond to requests
app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});
// 404 page

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
