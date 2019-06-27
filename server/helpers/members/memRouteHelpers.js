const Joi = require('joi');

module.exports = {

        memValidateParams: (schema, name) => {
            return(req, res, next) => {                
                const result = Joi.validate({ param: req['params'][name]}, schema)
                if(result.error){
                    return res.status(400).json(result.error)
                } else {

                    if(!req.value)
                        req.value={};
                    if(!req.value['params'])
                        req.value['params'] = {}

                    req.value['params'][name] = result.value.param;
                    next();

                }
            }
        },

        memValidateBody: (schema) => {
            return(req, res, next) => {
                const result = Joi.validate(req.body, schema);
                if(result.error){
                    return res.status(400).json(result.error)
                } else {

                    if(!req.value)
                        req.value = {};
                    if(!req.value['body'])
                        req.value['body']= {};
                        req.value['body'] = result.value;

                    next();

                }
            }

        },

        memSchemas: {  
                  
            ownerSchema: Joi.object().keys({
                date: Joi.date().iso(),
                status: Joi.string().required(),
                partner: Joi.string().trim().min(3).max(30).required(),
                companyName: Joi.string().trim().min(3).max(50).required(),
                stars: Joi.number().integer().positive().required(),
                tel: Joi.string().trim().regex(/^[0-9\+]{1,}[0-9\.]{3,15}$/).required(), 
                fax: Joi.string().trim().regex(/^[0-9\+]{1,}[0-9\.]{3,15}$/).required(),
                mail: Joi.string().email({ minDomainAtoms: 2 }).required(),
                address: Joi.object().keys({
                    street: Joi.string().trim().max(50).required(),
                    zip: Joi.string().trim().max(30).required(),
                    city: Joi.string().trim().max(50).required(),
                    land: Joi.string().trim().max(40).required(),
                    lat: Joi.string().trim().regex(/^([\d]{1,2})(((\.)(\d+)))$/).required(),
                    lng: Joi.string().trim().regex(/^([\d]{1,2})(((\.)(\d+)))$/).required()
                }),
                credentials: Joi.object().keys({
                    mail: Joi.string().email({ minDomainAtoms: 2 }).required(),
                    password: Joi.string().trim().min(3).max(30).required(),
                    role: Joi.string().trim().max(30),
                    logName: Joi.string().trim().min(6).max(16).required(),
                }),
                type: Joi.string().trim().max(40).required(),
                web: Joi.string().trim().max(50).required(),
                facility: Joi.object().keys({
                    checkIn: Joi.string().trim().max(30).required(),
                    checkOut: Joi.string().trim().max(30).required(),
                    card: Joi.string().trim().max(30).required(),
                    priParking: Joi.string().trim().max(30).required(),
                    pubParking: Joi.string().trim().max(30).required(),
                    bagage: Joi.string().trim().max(30).required(),
                    reception: Joi.string().trim().max(30).required()

                }),
                service: Joi.object().keys({
                    conference: Joi.boolean().required(),
                    restaurant: Joi.boolean().required(),
                    laundry: Joi.boolean().required(),
                    ticket: Joi.boolean().required(),
                    business: Joi.boolean().required(),
                    exchange: Joi.boolean().required(),
                    dry: Joi.boolean().required(),
                    room: Joi.boolean(),
                    elevator: Joi.boolean().required(),
                    bike: Joi.boolean().required(),
                    peds: Joi.boolean().required(),
                    wifi: Joi.boolean().required(),
                    washCenter: Joi.boolean().required(),
                    invalid: Joi.boolean().required(),
                    bar: Joi.boolean().required(),
                    carRental: Joi.boolean().required()
                }),
                fileName: Joi.string().trim().max(100).required(),
                file: Joi.string().trim().max(100).required()
            }),     

            idSchema: Joi.object().keys({
                param: Joi.string().trim().regex(/^[0-9a-fA-F]{24}$/).required()
            
            })
        }
    }