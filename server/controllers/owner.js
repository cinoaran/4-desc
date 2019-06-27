// Owner Model
const fs = require('fs');
const path = require('path')
const config = require('config');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner');
const Room = require('../models/Room');
const bcrypt = require('bcryptjs');


/*
    Need s node version > 7.6


  index: async (req,res,next) =>{
        try{
            
            const owners = await Owner.find({});            
            res.status(200).json(owners);       

        } catch(err){
            next(err)
        }
        
    }

    Get rid of try catch block in async await
    const router = require('express-promise-router')();

*/




module.exports = {
    /*====================================================*
    *    GET REQUEST TO http://localhost:5000/api/owners
    *
    *    GETS ALL OWNER
    */

    index: async (req, res, next) => {
            const owners = await Owner.find({}).select('-credentials');                      
            res.status(200).json(owners);        
    },

    /*====================================================*/

   /*====================================================*
    *    POST REQUEST TO http://localhost:5000/api/owners
    *
        REQUEST VALUE NEW OWNER
        {
            "address": {
            "street": "John street 33",
            "zip": "998877N",
            "city": "London",
            "land": "UK",
            "lat": "98.987676",
            "lng": "23.476767"
            },
            "credentials": [{
            "mail": "jane@johns-hotel.com",
            "password": "janespassword",
            "role": "admin",
            "logName": "janeslogname"
            }],
            "facility": {
            "checkIn": "12.00",
            "checkOut": "15.00",
            "card": "Visa, Amex, Mastercard",
            "priParking": "Free to use",
            "pubParking": "5.00",
            "bagage": "17.00",
            "reception": "12.00-17.00"
            },
            "partner": "John Doe",
            "companyName": "John s Hotel",
            "stars": 3,
            "tel": "0049.30.999888",
            "fax": "0049.30.999888",
            "mail": "office@johns-hotel.com",
            "type": "hotel",
            "web": "www.johns-hotel.com"
        }
    */

    addNewOwner: async (req, res, next) => {

            
            
            const newOwner = new Owner(req.value.body);
            const { credentials, type, companyName, mail, web } = newOwner;

                        
            // Create Salt & Hash
            await bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(credentials.password, salt, (err, hash) => {
                    if(err) throw err;
                    newOwner.credentials.password = hash;
                    newOwner.credentials.mail = credentials.mail; 
                    const filesDir = `${__dirname}/../public/${web}`;
                        // check if directory exists
                        if (!fs.existsSync(filesDir)) {
                        // if not create directory
                            fs.mkdirSync(filesDir);
                        }                   
                    newOwner.save()
                        .then(owner => {                                                        
                            res.status(200).json({success: true, type, companyName, mail})
                        })
                        .catch(err => console.log(err));
                    })
            })  
           
    },

    /*====================================================*/

    /*====================================================*
    *    DELETE REQUEST TO http://localhost:5000/api/owners/5cb98ac3e4785c141cba34ba
    *
    *    DELETE ONE OWNER 
    */

    deleteOwner: async (req, res, next) => {
            const { ownerId } = req.value.params;
            const owner = await Owner.findById(ownerId);
            const delOwnerId = owner.id;
            const delOwnerCompany = owner.companyName;
            await owner.remove();
            res.json({success: true, delOwnerId, delOwnerCompany});        
    },

    /*====================================================*/

    /*====================================================*
    *    GET REQUEST TO http://localhost:5000/api/owners/5cb1f2a32a926a12e391f5f6
    *
    *    GET SPECIFIC OWNER BY ID 
    */

    getOwner: async (req, res, next) => { 
        const { ownerId } = req.value.params;     
        const owner = await Owner.findById(ownerId).select('-credentials');
        res.status(200).json(owner);   
    },

    /*====================================================*/

    /*====================================================*
    *    PUT REQUEST TO http://localhost:5000/api/owners/5cb1f2a32a926a12e391f5f6
    *
    *    REPLACE SPECIFIC OWNER BY ID 
    *   
    *    CREDENTIALS WILL BE UPDATED ON newOwnerUserUpdate BECAUSE OF PASSWORD HASHING
    */   

    replaceOwner: async (req, res, next) => {
        const { ownerId } = req.value.params;
        const newOwner = req.value.body;
        const result = await Owner.findByIdAndUpdate(ownerId, newOwner);
        res.status(200).json({success: true});  
    },



    /*====================================================*/  


    /*     
        updateOwner: async (req, res, next) => {
        const { ownerId } = req.value.params;
        const newOwner = req.value.body;
        const result = await Owner.findByIdAndUpdate(ownerId, newOwner);
        res.status(200).json({success: true}); 
    }, */

    /*====================================================*/       
    
    /*    
    *    POST REQUEST TO http://localhost:5000/api/owners/5cb1f2a32a926a12e391f5f6/register
    *
    *    ADD NEW USER TO OWNER 
    * 
    *   {
            "mail":     "jane@johns-hotel.com",
            "password": "janespassword",
            "role":     "admin",
            "logName":  "janeslogname"
        }
    *   
    *    
    */  


    newOwnerUser: async (req, res, next) => {
        const { ownerId } = req.value.params;
        const newUserBody = req.value.body;
        const owner = await Owner.findById(ownerId);
        console.log(req.file);

        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUserBody.password, salt, (err, hash) => {
                if(err) throw err;
                newUserBody.password = hash;
                owner.credentials.push(newUserBody);
                owner.save()
                    .then(owner => {
                        console.log('owner.id', owner.id)                            
                        res.status(200).json({success: true, owner})
                    });
            })
        })  
    },

    /*====================================================*/


    /*    
    *    PATCH REQUEST TO http://localhost:5000/api/owners/5cb1f2a32a926a12e391f5f6/register
    *
    *    PATCH SPEC USER FROM OWNER 
    * 
    *   {
            "credentials": [{
			                    "id": "5cbacf214b1df914ac61dd9b",
                                "mail": "patched@johns-hotel.com",
                                "password": "patchedpassword",
                                "role": "restaurant",
                                "logName": "patchedlogname"
	
		                    }]
        }
    *   
    *    
    */  

    newOwnerUserUpdate: async (req, res, next) => {
        const { ownerId } = req.value.params;
        const userOwner = req.value.body;
        let password = userOwner.credentials[0].password;
        if(password){
           bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if(err) throw err;
                    password = hash;
                    Owner.updateOne(
                        { 'credentials._id': userOwner.credentials[0].id }, 
                        { $set: {                             
                            'credentials.$.mail': userOwner.credentials[0].mail,
                            'credentials.$.password': password, 
                            'credentials.$.role': userOwner.credentials[0].role,
                            'credentials.$.logName': userOwner.credentials[0].logName
                            }
                        }
                                     
                ).then(owner => {
                    
                    res.status(200).json({success: true});
                })
                                
            })           
            
            })

        }else {
            await Owner.updateOne(
                { 'credentials._id': userOwner.credentials[0].id }, 
                { $set: {                             
                    'credentials.$.mail': userOwner.credentials[0].mail,
                    'credentials.$.role': userOwner.credentials[0].role,
                    'credentials.$.logName': userOwner.credentials[0].logName
                    }
                }                             
            )
            res.status(200).json({success: true});
        }
      
       
    },

    /*====================================================*/


    /*    
    *    DELETE REQUEST TO http://localhost:5000/api/owners/5cb1f2a32a926a12e391f5f6/register
    *
    *    DELETE SPEC USER BY ID FROM OWNER 
    * 
    *   {
            "credentials": [{
			                    "id": "5cbacf214b1df914ac61dd9b"	
		                    }]
        }
    *   
    *    
    */  

    newOwnerUserDelete: async (req, res, next) => {
        const { ownerId } = req.value.params;
        const userOwner = req.value.body;
        //console.log(userOwner.credentials[0].id)
        await Owner.findOneAndUpdate(ownerId, {
            $pull: {
                credentials: {_id: userOwner.credentials[0].id}
            }
        });

        const owner = await Owner.findById(ownerId)
        const leftOwnerCredentials =  owner.credentials.map(item => {           
            return item
        })
          
        res.status(200).json({success: true});
    },

    /*====================================================*/
    /*    
    *    POST REQUEST TO http://localhost:5000/api/owners
    *
    *    POST CREDENTIALS FOR LOGIN
    * 
    *    GET BACK JWT TOKEN ON SUCCESS
    */ 

    loginOwner:async (req, res, next) => {

        const userOwner = req.value.body;
        

        // const owner = await Owner.find({credentials:{logName:'janeslogname'}});

        const owner = await Owner.findOne({"credentials" : {$elemMatch: {"mail": {$eq:userOwner.mail} }}})
        const filteredOwnerUser = owner.credentials.filter((credential) => credential.mail.includes(userOwner.mail))
                    
        if(owner && bcrypt.compareSync(userOwner.password, filteredOwnerUser[0].password)){
        
            jwt.sign(
            {id: owner.id}, 
            config.get('jwtSecret'), 
            { expiresIn: 3600}, 
            (err, token) => {
                if(err)
                    throw err;
        
                res.status(201).json({
                token,
                owner: {
                    id: owner.id,
                    redirect: 'dashboard',
                    name: owner.companyName,
                    role: filteredOwnerUser[0].role,
                    logName: filteredOwnerUser[0].logName,
                } });
            }) 
            
        
        }else{
            res.status(400).json({error: "User not found !"})
        }

    },
    /*====================================================*/
    /*    
    *    GET REQUEST TO http://localhost:5000/api/owners/5cb1f2a32a926a12e391f5f6/rooms
    *
    *    GET ALL ROOMS FROM OWNER BY ID 5cb1f2a32a926a12e391f5f6 
    */ 

    getOwnerRooms: async (req, res, next) => {
        const { ownerId } = req.value.params;
        const owner = await Owner.findById(ownerId).populate('rooms');
        res.status(200).json(owner.rooms);
    },
    /*====================================================*/


    /*    
    *    POST REQUEST TO http://localhost:5000/api/owners/5cb1f2a32a926a12e391f5f6/rooms
    *
    *    ADD ROOMS TO OWNERS AND ROOMS COLLECTION  
    * 
    *   {  
        				"icons": {
           					"roomWifi": false,
            					"bath": false,
            					"bathFloor": false,
            					"kitchen": false,                                                                                                                                                                            
            					"roomTel": false,
            					"hairDryer": false,
            					"airCondition": false,
            					"washingMachine": false,
            					"iron": false,
            					"smoking": false,
            					"fridge": false,
            					"miniBar": false,
            					"safe": false,
            					"lateCheckIn": false,
            					"balcony": false,
            					"tv": false,
            					"computer": false
        					},
        				"category": "B",
        				"pricePerDay": 39.99,
        				"sqm": "33",
        				"minStay": 3,
        				"description_de": "BlaBlaBla DE",
        				"description_en": "BlaBlaBla EN",
        				"roomCount": 3,
        				"roomNumbers": [
        						    "101",
        						    "201"
        				],
        				"capacity": 3,
        				"cancelDays": 5,
        				"breakfastInk": false,
        				"breakfastCosts": 6.99
        
    			}
    *   
    *    
    */  

    newOwnerRoom: async (req, res, next) => {
        const { ownerId } = req.value.params;
        // Create new Room
        const newRoomBody = req.value.body;
        const newRoom = new Room(newRoomBody);
        // console.log('newRoom', newRoom);
        // Find the owner to fullfil the relation
        const owner = await Owner.findById(ownerId);
        // Assign Owner as room owner
        newRoom.owner = owner;
        // Save the room 
        await newRoom.save();

        // Add room to the owners owner array
        owner.rooms.push(newRoom);
        // Save the owner
        await owner.save();
        res.status(201).json({success: true, roomNumbers:newRoom.roomNumbers, rates: newRoom.rates});        
    }
    /*====================================================*/
}