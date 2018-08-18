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


//  Mongo Connect

mongoose.connect('mongodb://manageit:manageit30!@ds247290.mlab.com:47290/manageit')

// Body-Parser

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


// Routing

app.use('/user', userRoute);
app.use('/order', orderRoute);
app.use('/inbox', inboxRoute);
app.use('/customer', customerRoute);
app.use('/comment', commentRoute);
app.use('/timestamp', timestampRoute)





// Test response Middleware



// Middleware


module.exports = app;