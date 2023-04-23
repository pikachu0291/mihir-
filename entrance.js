const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Assuming you have a users collection in your database with documents for username and password_hash
// You could use a database query to retrieve the hashed password for the entered username
const username = 'admin';

// Assuming you have a form with inputs for username and password
app.post('/login', function(req, res) {
  const enteredUsername = req.body.username;
  const enteredPassword = req.body.password;

  // Connect to MongoDB
  MongoClient.connect('mongodb+srv://Mihir:mihir1234@cluster0.btndpif.mongodb.net/test', function(err, client) {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Get the users collection from the database
    const db = client.db('mydatabase');
    const users = db.collection('users');

    // Find the user with the entered username
    users.findOne({ username: enteredUsername }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
        return;
      }

      if (!user) {
        // User not found, show an error message
        res.render('login', { errorMessage: 'Incorrect username or password' });
        return;
      }

      // Compare the entered password with the stored hash
      bcrypt.compare(enteredPassword, user.password_hash, function(err, result) {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
          return;
        } else if (result) {
          // Passwords match, so log in the user
          req.session.loggedIn = true;
          res.redirect('/admin/dashboard');
        } else {
          // Passwords don't match, so show an error message
          res.render('login', { errorMessage: 'Incorrect username or password' });
        }

        // Close the database connection
        client.close();
      });
    });
  });
});