// Dependencies
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();


// Model Import
const Inbox = require('../models/inboxmodel');

// Creates new Inbox
router.post('/createinbox', (req, res, next) => {
    
    const newInbox = new Inbox({
        inboxid: new mongoose.Types.ObjectId(),
        userid: req.body.userid,
        ownername: req.body.ownername
    });
    
    newInbox.save()
    .then(result =>{
        res.status(201).json(result);
        console.log('new Inbox was created');
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('Inbox creation failed');
    })

    
});



// gets all messages

router.get('/getallmessages/:userid', (req, res, next) => {
    Inbox.findOne({userid: req.params.userid})
    .then(result => {
        if (result){
            res.status(200).json(result)
        }
        
        else{
            res.status(404).json('unable to find Inbox')
        } 
    })
    .catch(err => {
        res.status(500).json(err)
    })
})



// Sends Message
// Creates a new Message Object literal in the specific Inbox


router.patch('/sendmessage', (req, res, next) => {
    
    const newMessage = {
        senderid: req.body.senderid,
        sendername: req.body.sendername,
        messagetext: req.body.messagetext,
        messageid: new mongoose.Types.ObjectId(),
    }
    
    
    
    Inbox.findOneAndUpdate({inboxid: req.body.inboxid}, {$push: {messages: newMessage}})
    .then(result => {
        res.status(200).json(result);
        console.log('message was send succesfully')
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('message could not be send')
    })
})



// Delete Message
// NOT WORKING !!!!!

router.patch('/deletemessage', (req, res, next) => {

    

    Inbox.update(
        { inboxid: req.body.inboxid },
        { $pull: {"messages.messageid": req.body.messageid}}
    )
    
        .then(result => {
            res.status(200).json(result);
            console.log('message was deleted')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('message could not deleted')
        })
});


// Post Request to get all Messages for your Inbox

router.post('/getmessages', (req, res, next) => {
    Inbox.findOne({inboxid: req.body.inboxid})
    .then(result => {
        res.status(200).json(result.messages);
        console.log('inbox found - messages downloaded')

    })
    .catch(err => {
        res.status(500).json(err)
        console.log('unable to download your messages')
    })
})




module.exports = router;