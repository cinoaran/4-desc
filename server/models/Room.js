const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
    {
        category: {type: String, default: 'A', required: true},
        rates: [{
            day: {type: Date, default: null},
            price: {type:Number, default:null},
        }],
        
        pricePerDay: {type:Number, default:0.00, required: true},
        sqm: {type:String, default:'0.00', required: true},
        minStay: {type: Number, default: 0, required: true},
        description_de: {type:String, default:'No description DE', required: true},
        description_en: {type:String, default:'No description EN', required: true},
        roomCount: {type: Number, default: 0, required: true},
        roomNumber: {type: String, required: true},
        capacity: {type:Number, default:0, required: true},
        cancelDays: {type:Number, default:0, required: true},
        breakfastInk: {type:Boolean, default: false, required: true},
        breakfastCosts: {type:Number, default:0.00, required: true},
        icons: {    
            roomWifi: {type:Boolean, default: false},
            bath: {type:Boolean, default: false},
            bathFloor: {type:Boolean, default: false},
            kitchen: {type:Boolean, default: false},
            roomTel: {type:Boolean, default: false},
            hairDryer: {type:Boolean, default: false},
            airCondition: {type:Boolean, default: false},
            washingMachine: {type:Boolean, default: false},
            iron: {type:Boolean, default: false},
            smoking: {type:Boolean, default: false},
            fridge: {type:Boolean, default: false},
            miniBar: {type:Boolean, default: false},
            safe: {type:Boolean, default: false},
            lateCheckIn: {type:Boolean, default: false},
            balcony: {type:Boolean, default: false},
            tv: {type:Boolean, default: false},
            computer: {type:Boolean, default: false}
        },
        owner: [
            {
                type: Schema.Types.ObjectId, 
                ref:'owner'
            }
        ]   
    }

   
)

module.exports = Room = mongoose.model('room', RoomSchema);