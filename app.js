// "dev": "concurrently \"npm run server\" \"npm run client\""
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const port = process.env.PORT || 5000;

// Express
const app = express();

// Set up
const allowedOrigins = ["http://localhost:3000", "http://localhost:8080"]
app.use(
    cors({
        origin: function(origin, callback) {
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        }
    })
);
app.use(express.json({limit: "30mb", extended: true}));

// Routes
app.use('/account', require('./routes/account'))
app.get('/', (req, res) => {
	res.json({'data':'important data'});
});

// MongoDB
mongoose.connect(process.env.URI, { useUnifiedTopology: true, useNewUrlParser: true })
.then((res) => console.log('Succes connection with MongoDB'))
.catch(err => console.log(err))

// Start server
app.listen(port, '127.0.0.1', () => {
	console.log(`Run server in port ${port}`);
});