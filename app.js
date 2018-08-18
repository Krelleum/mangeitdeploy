//  Dependencies

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// Route Import

const userRoute = require('./api/routes/userroutes');
const orderRoute = require('./api/routes/orderroutes');
const inboxRoute = require('./api/routes/inboxroutes');
const customerRoute = require('./api/routes/customerroutes');
const commentRoute = require('./api/routes/commentroutes');
const timestampRoute = require('./api/routes/timestamproute');



// Path from Mern Heroku Deploy Tutorial
//
//
const path = require("path")

//  Mongo Connect

mongoose.connect(process.env.MONGOLAB_URI)

// Body-Parser
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// CORS HANDLER

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// from Mern Heroku Deploy Tutorial
app.use(express.static(path.join(__dirname, "client", "build")))
// Routing

app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/inbox', inboxRoute);
app.use('/customer', customerRoute);
app.use('/comment', commentRoute);
app.use('/timestamp', timestampRoute)

//  404 and 500 Handler
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;

    next(error);
})


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


// For Deployment
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


module.exports = app;