const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();


const Customer = require('../models/customermodel');


// Create new Customer

router.post('/createcustomer', (req, res, next) => {

    Customer.findOne({ name: req.body.name })
        .exec()
        .then(customer => {
            if (customer) {
                console.log('user already exists')
                return res.status(409).json({ error: 'customer already exists', customer: customer })
            }
            else {

                const newCustomer = new Customer({
                    customerid: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    street: req.body.street,
                    room: req.body.room,
                    phone: req.body.phone,
                    customeremail: req.body.customeremail,
                    usercontact: req.body.userid
                });


                newCustomer.save()
                    .then(result => {
                        res.status(201).json(result);
                        console.log('Customer was created')
                    })
                    .catch(err => {
                        res.status(500).json(err);
                        console.log('Customer not')
                    })

            }
        })


        .catch(err => {
            res.status(500).json(err);
            console.log(err)
        })

});

// Add Orders 

router.patch('/addorder', (req, res, next) => {
    Customer.findOneAndUpdate({ customerid: req.body.customerid }, { $push: { orders: req.body.orderid } })
        .then(result => {
            res.status(200).json(result);
            console.log('new order was added to Customer')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('order could not be added to Customer')
        })
});


// Delete Orders
router.patch('/deleteorder', (req, res, next) => {
    Customer.findOneAndUpdate({ customerid: req.body.customerid }, { $pull: { orders: req.body.orderid } })
        .then(result => {
            res.status(200).json(result);
            console.log('Order was deleted  from Customer')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('order could not be deleted from Customer')
        })
});


// Patch Customer User Contacts

// Delete Orders
router.patch('/customercontacts', (req, res, next) => {
    Customer.findOneAndUpdate({ customerid: req.body.customerid }, { $push: { usercontact: req.body.userid } })
        .then(result => {
            res.status(200).json(result);
            console.log('Customer User Contacts were updated')
        })
        .catch(err => {
            res.status(500).json(err);
            console.log('couldnt update Customer User Contacts')
        })
});



// Get All Customer

router.get('/getallcustomer', (req, res, next) => {
    Customer.find()
        .then(result => {
            res.status(200).json(result)
            console.log('Getting all Customers')
        })
        .catch(err => {
            res.status(500).json(err)
        })
})




// Search Customer

router.get('/searchcustomer/:customername', (req, res, next) => {
    
    var customername = req.params.customername;
    console.log(customername);
    Customer.findOne({name: customername})
    
    .then(result => {
        console.log('found Customer');
        if(result === null){
            
            res.status(404).json(result);
        }
        else{
            res.status(200).json(result);
        }
        
    })
    .catch(err => {
        res.status(404).json(err);
    })
});


// Find Customer by ID

router.get('/findcustomerid/:customerid', (req, res, next) => {
    Customer.findOne({ customerid: req.params.customerid})
        .then(result => {
            res.status(200).json(result)
            console.log('Found Customer')
        })
        .catch(err => {
            res.status(500).json(err)
        })
})




module.exports = router;