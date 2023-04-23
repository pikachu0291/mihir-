const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
require('express-async-errors');
const adminRouter = require('./models/admin.router');
const port = process.env.PORT || 3001;
require('./db/conn');
const Register = require('./models/registers');


app.use('/admin',adminRouter);
const static_path = path.join(__dirname, '../public');
const templates_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

const scoresRouter = require('./routes/scores');
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
app.set('views', templates_path);
hbs.registerPartials(partials_path);

app.get('/', (req, res) => {
  res.render('register');
});
app.get('/register', (req, res) => {
  res.render('register');
});
app.get('/index', (req, res) => {
  res.render('index');
});
app.post('/register', async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmpassword;
    if (password === cpassword) {
      const registerUser = new Register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        score: req.body.score,
      });
      const registered = await registerUser.save();
      res.status(201).render('register');
    } else {
      res.send('passwords are not matching.');
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post('/login', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const useremail = await Register.findOne({ email: email });
    if (useremail.password === password) {
      const registers = await Register.find()
        .sort({ score: -1 })
        .limit(10)
       
.exec();
            // docs.forEach((doc, index) => {
            //     doc.rank = index + 1;
            //   });
            res.status(201).render("index",{ registers: registers });
        }else{
            res.send("Invalid login credentials.");
        }
    } catch (error) {
        res.status(400).send("Invalid login Credentials");
    }
})


// scoreboard to show the name and score
// app.get('/login', async function(req, res, next) {
//     try {
//       const registers = await Register.find().exec();
//       console.log(registers);
//       res.render('index', { registers: registers });
//     } catch (err) {
//       next(err);
//     }
//   });
  
  // Error handling middleware
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  
app.listen(port,() =>{
    console.log(`server is running on port no ${port}`);
});

