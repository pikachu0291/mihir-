const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();

// set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// connect to MongoDB database
mongoose.connect('mongodb+srv://Mihir:mihir1234@cluster0.btndpif.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(error => console.error('Database connection error:', error));

// define schema for user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  timeTaken: Number,
  accuracy: Number
});

// create model for user data
const User = mongoose.model('User', userSchema);

// define routes
app.get('/', (req, res) => {
  res.render('dashboard');
});

app.get('/users', (req, res) => {
  User.find({}, (error, users) => {
    if (error) {
      console.error('Error fetching user data:', error);
      res.status(500).send('Error fetching user data');
    } else {
      res.render('users', { users });
    }
  });
});

// start server
app.listen(3001, () => {
  console.log('Server listening on port 3000');
});