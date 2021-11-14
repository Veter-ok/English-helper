// "dev": "concurrently \"npm run server\" \"npm run client\""
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;

// Express
const app = express();

// Set up
app.use(cors());
app.use(express.json({limit: "30mb", extended: true}));

// Routes
app.use('/api', require('./routes/routes'))

if (process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
}

// MongoDB
async function start() {
    try{
        await mongoose.connect(process.env.URI, { 
            useUnifiedTopology: true, 
            useNewUrlParser: true, 
            useCreateIndex: true})
        console.log('Succes connection with MongoDB')
        app.listen(port, '0.0.0.0', () => {
            console.log(`Run server in port ${port}`);
        });
    }catch(error){
        console.log(error)
    }
}

start();