const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    customerid: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    street: String,
    room: String,
    phone: String,
    customeremail: String,
    orders: Array,
    usercontact: Array,
    timecreated: {type: Date, default: Date.now}

});

module.exports = mongoose.model('Customer', customerSchema);