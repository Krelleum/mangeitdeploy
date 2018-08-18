const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

// Model Import
const TimeStamp = require('../models/timestampmodel');



// USE ONLY FOR INITIALISATION ---- CREATES NEW DATABASE FOR TIMESTAMPS
router.post('/createtimestamp', (req, res, next) => {
    const newTimeStamp = new TimeStamp({
      
    })

    newTimeStamp.save()
        .then(result => {
            res.status(201).json(result);
            console.log('new Timestamp was succesfully created')
        })
        .catch(err => {
            res.status(500).json(err)
            console.log(err)
        })
});



// Increments the Timestamp Counter

router.patch('/patchtimestamp/:time', (req, res, next) => {
    var time = req.params.time;
    
    if (time)
        TimeStamp.findByIdAndUpdate({ _id: '5b587bce8a2fbc06d8ebb40a'},{$inc: {[time]: 1}})
    
    .then(result => {
        res.status(200).json(result);
        console.log(time + ' has been incremented')
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('error while updating Timestamp')
    })
})



// Gets all TimeStamp values

router.get('/gettimestamp', (req, res, next) => {
    TimeStamp.findOne({ _id: '5b587bce8a2fbc06d8ebb40a'})
    .then(result => {
        res.status(200).json(result);
        
    })
    .catch(err => {
        res.status(500).json(result)
    })
})





module.exports = router;