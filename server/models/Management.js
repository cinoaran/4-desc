const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ManagementSchema = new Schema(   
    {
        details: {
            companyName: {type:String, required:true},
            tel: {type: String, required: true},
            fax: {type: String, required: true},
            mail: {type: String, required: true},
            logo: {type: String, required: true},
            address: {
                street: {type: String, required: true},
                zip: {type: String, required: true},
                city: {type: String, required: true},
                land: {type: String, required: true},
                lat: {type: String, required: true},
                lng: {type: String, required: true}
            }
        },       
        credentials: [{
            mail: {type: String, required: true},
            password: {type: String, required: true},
            role: {type: String, required: true},
            logName: {type: String, required: true}
            
        }],
        homeSlider: [{
            image: {type: String, required: true},
            textEn: {type: String, required: true},
            textDe: {type: String, required: true}
        }],
        web: {

            image: {type: String, required: true},
            textEn: {type: String, required: true},
            textDe: {type: String, required: true}
        },
        schedule: {

            image: {type: String, required: true},
            textEn: {type: String, required: true},
            textDe: {type: String, required: true}
        },
        budget: {

            image: {type: String, required: true},
            textEn: {type: String, required: true},
            textDe: {type: String, required: true}
        },
        finance: {

            image: {type: String, required: true},
            textEn: {type: String, required: true},
            textDe: {type: String, required: true}
        },
        vision: {

            image: {type: String, required: true},
            textEn: {type: String, required: true},
            textDe: {type: String, required: true}
        },
        who: [{
            image: {type: String, required: true},
            textEn: {type: String, required: true},
            textDe: {type: String, required: true}            
        }],
        bAccount: {
            bName: {type: String, required: true},
            bNumber: {type: String, required: true},
            bSepa: {type: String, required: true},
            bHolder: {type: String, required: true}
        }     
    }
)


module.exports = Management = mongoose.model('management', ManagementSchema);