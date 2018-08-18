const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Order = require('../models/ordermodel');



// Create Order

router.post('/createorder', (req, res, next) => {
    const newOrder = new Order({
        orderid: new mongoose.Types.ObjectId(),
        customerid: req.body.customerid,
        userid: req.body.userid,
        ordertype: req.body.ordertype,
        orderheading: req.body.orderheading,
        ordershort: req.body.ordershort,
        orderdescription: req.body.orderdescription,
        orderpriority: req.body.orderpriority,
        username: req.body.username,
        customername: req.body.customername,
        
    })
    
    newOrder.save()
    .then(result => {
        res.status(201).json(result);
        console.log('new order was succesfully created')
    })
    .catch(err => {
        res.status(500).json(err)
        console.log(err)
    })
});


// add commentId

router.patch('/addcommentid', (req, res, next) => {
    Order.findOneAndUpdate({orderid: req.body.orderid}, {$push :{commentid: req.body.commentid}})
    .then(result => {
        res.status(200).json(result)
        console.log('comment id was succesfully added')
    })
    .catch(err => {
        res.status(500).json(err)
        console.log('failed to add comment id')
    })
});


// get Orders by ID


router.get('/getorderbyid/:orderid', (req, res, next) => {
    Order.findOne({ orderid: req.params.orderid })
        .then(result => {
            res.status(200).json(result)
            
        })
        .catch(err => {
            console.log(err)
        })
})

// get all open Orders

router.get('/getopenorders', (req, res, next) => {
    Order.find({orderstatus: 'open'})
    .then(result => {
        res.status(200).json(result)
        
    })
    .catch(err => {
        console.log(err)
    })
})





// get all closed Orders

router.get('/getclosedorders', (req, res, next) => {
    Order.find({ orderstatus: 'closed' })
        .then(result => {
            res.status(200).json(result)
            
        })
        .catch(err => {
            console.log(err)
        })
})



// get orders by Customer ID

router.get('/getcustomerorders', (req, res, next) => {
    Order.find({ customerid: req.body.customerid })
        .then(result => {
            res.status(200).json(result)
            
        })
        .catch(err => {
            console.log(err)
        })
})



// Change Order Status 

router.patch('/changeorderstatus', (req, res, next) => {
    Order.findOneAndUpdate({orderid: req.body.orderid}, {orderstatus: req.body.orderstatus})
    .then(result => {
        res.status(200).json(result);
        console.log('orderstatus changed')
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('cannot change orderstatus')
    })
});


// delete Order

router.delete('/deleteorder/:orderid', (req, res, next) => {
    Order.findOneAndRemove({orderid: req.params.orderid})
    .then(result => {
        if(result){
            console.log('order deleted Succesfully')
            return res.status(200).json(result);
            
        }else{
            res.status(500).json(err);
            console.log('cannot delete Order')
        }
        
    })
    .catch(err => {
        res.status(500).json(err);
        console.log('cannot delete Order')
    })
})



















module.exports = router;


