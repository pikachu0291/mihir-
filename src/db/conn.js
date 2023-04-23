const dotenv = require('dotenv');
const mongoose = require("mongoose");

// mongoose.connect(`mongodb://localhost:27017/UserRegistration`).then(() => {
//     console.log('Connection successful');
// }).catch((error) => {
//     console.log('Error connecting to MongoDB:', error.message);
// });


mongoose.connect(
    'mongodb+srv://mihir:mihir1234@cluster0.wjhhoox.mongodb.net/UserRegistration'
).then(
    () => {console.log("connected ")
}).catch((e) => {
    console.log(e);
})

    
module.exports = {mongoose};