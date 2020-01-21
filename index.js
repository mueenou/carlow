const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
// Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

// Connect to Database
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('Connected to DB')
    ); 
    
app.use(cors());
// Middleware
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
    extended: false
    })
);
    
    
    // Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(3000, () => console.log('Server Up and running !'));