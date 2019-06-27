const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    partner: {
        type: String,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    stars:{
        type: Number,
        required: true
    },
    tel:{
        type: String,
        required: true
    },
    fax:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    },    
    
    address:{
        street: {type: String, required: true},
        zip: {type: String, required: true},
        city: {type: String, required: true},
        land: {type: String, required: true},
        lat: {type: Number, required: true},
        lng: {type: Number, required: true},    
    },
    credentials:{
        mail: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, required: true},
        logName: {type: String, required: true}
        }
    ,       
    type:{type: String},
    web:{type: String},
    facility: {    
        checkIn: {type: String, required: true},
        checkOut: {type: String, required: true},
        card: {type: String, required: true},
        priParking: {type: String, required: true},
        pubParking: {type: String, required: true},
        bagage: {type: String, required: true},
        reception: {type: String, required: true},
    },
    service: {
        conference: {type:Boolean, default: false},
        restaurant: {type:Boolean, default: false},
        laundry: {type:Boolean, default: false},
        ticket: {type:Boolean, default: false},
        business: {type:Boolean, default: false},
        exchange: {type:Boolean, default: false},
        dry: {type:Boolean, default: false},
        room: {type:Boolean, default: false},
        elevator: {type:Boolean, default: false},
        bike: {type:Boolean, default: false},
        peds: {type:Boolean, default: false},
        wifi: {type:Boolean, default: false},
        washCenter: {type:Boolean, default: false},
        invalid: {type:Boolean, default: false},
        bar: {type:Boolean, default: false},
        carRental: {type:Boolean, default: false},
    },
    rooms: [
        {
            type: Schema.Types.ObjectId, 
            ref:'room'
        }
    ]    
});

module.exports = Owner = mongoose.model('owner', OwnerSchema);