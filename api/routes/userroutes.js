// Dependencies
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Model Import
const User = require('../models/usermodel');

// JSON WEB TOKEN
const jwt = require('jsonwebtoken');

// Create new User

router.post('/signup', (req, res, next) => {


    User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({ message: 'Error - Username Already Exists' })
            }
            else {
                const newUser = new User({
                    userid: new mongoose.Types.ObjectId(),
                    username: req.body.username,
                    password: req.body.password,
                    useremail: req.body.useremail,
                    userphone: req.body.userphone,

                });

                newUser.save()
                    .then(result => {
                        res.status(201).json(result);
                        console.log('User created succesfully')
                    })
                    .catch(err => {
                        res.status(500).json(err);
                        console.log('User creation failed')
                    })
            }
        }).catch(err => {
            res.status(500).json(err);
        })


});


// Login 

router.post('/login', (req, res, next) => {

    User.findOne({ username: req.body.username })
        .exec()
        .then(user => {
            if (user && user.password === req.body.password) {
                // JSON WEB TOKEN
                var token = jwt.sign({ data: user.username }, 'ManageIt', { expiresIn: '1h' })
                res.status(200).json({ message: 'Login Authorized', token: token, userid: user.userid });
                console.log('Login Authorized - Token signed');
            }
            else {
                res.status(401).json({ message: 'Unauthorized' });
                console.log('Login Failed');
            }
        }).catch(err => {
            res.status(500).json(err);
            console.log('Error while loging in')
        })
});


// Veryfiy Token

router.post('/verify', (req, res, next) => {


    try {
        jwt.verify(req.headers.authorization, 'ManageIt');
        res.status(200).json({ message: 'Login authorized' })

    }
    catch (err) {

        return res.status(401).json({ message: 'unauthorized' })

    }



});

// Get All Users

router.get('/getallusers', (req, res, next) => {
    User.find()
        .then(result => {
            res.status(200).json(result)
            console.log(result)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


// Get User Information

router.get('/getuserdata/:userid', (req, res, next) => {
    User.findOne({ userid: req.params.userid })
        .then(result => {
            res.status(200).json(result)
            console.log('user data found')
        })
        .catch(err => {
            res.status(500).json(err)
        })
})





// Add Created Order

router.patch('/createdorders', (req, res, next) => {
    User.findOneAndUpdate({ userid: req.body.userid }, { $push: { createdorders: req.body.orderid } })
        .then(result => {
            res.status(200).json(result);
            console.log('created Orders were updated')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('Failed to update created Orders')
        })
});




// Add Fulfilled Order

router.patch('/fulfilledorders', (req, res, next) => {
    User.findOneAndUpdate({ userid: req.body.userid }, { $push: { fulfilledorders: req.body.fulfilledorder } })
        .then(result => {
            res.status(200).json(result);
            console.log('fulfilled Orders were updated');
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('failed to update fulfilled Orders');
        })
});

// Add Commented Order

router.patch('/commentedorders', (req, res, next) => {
    User.findOneAndUpdate({ userid: req.body.userid }, { $push: { commentedorders: req.body.commentedorder } })
        .then(result => {
            res.status(200).json(result);
            console.log('commented Orders were updated');
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('failed to update commented orders');
        })
});


// patch InboxId

router.patch('/patchuserinboxid', (req, res, next) => {
    User.findOneAndUpdate({ userid: req.body.userid }, { inboxid: req.body.inboxid })
        .then(result => {
            res.status(200).json(result);
            console.log('Inboxid was patched');
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('failed to patch inboxid');
        })
});

// get User by Username

router.get('/getuserbyname/:username', (req, res, next) => {

    User.findOne({ username: req.params.username })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


// delete User

router.delete('/deleteuser', (req, res, next) => {
    User.findOneAndRemove({ userid: req.body.userid })
        .then(result => {
            res.status(200).json(result)
            console.log('User was succesfully deleted')
        })
        .catch(err => {
            res.status(500).json(err)
            console.log('failed to delete User')
        })
});





module.exports = router;