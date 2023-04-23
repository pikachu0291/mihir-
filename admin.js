const bcrypt = require('bcrypt');
const saltRounds = 10;

const username = 'admin';
const password = 'password123';

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    // Store the hash in your database
    // For example, you could use a database query to insert the hash into a users table
    console.log(`Hashed password for ${username}: ${hash}`);
  }
});