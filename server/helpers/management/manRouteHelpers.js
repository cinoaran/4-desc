const Joi = require('joi');

module.exports = {

        manValidateParams: (schema, name) => {
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

        manValidateBody: (schema) => {
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

       manSchemas: {
        
        addManagementSchema: Joi.object().keys({
            
               details: Joi.object().keys({
                companyName: Joi.string().trim().min(3).max(30),
                tel: Joi.string().trim().min(3).max(30),
                fax: Joi.string().trim().min(3).max(30),
                mail: Joi.string().email({ minDomainAtoms: 2 }),
                logo: Joi.string().trim().min(3).max(100),
                address: Joi.object().keys({
                    street: Joi.string().trim().min(3).max(30),
                    zip: Joi.string().trim().min(3).max(30),
                    city: Joi.string().trim().min(3).max(30),
                    land: Joi.string().trim().min(3).max(30),
                    lat: Joi.string().trim().min(3).max(30),
                    lng: Joi.string().trim().min(3).max(30)
                }),
               
                }),
                credentials: Joi.object().keys({
                    mail: Joi.string().email({ minDomainAtoms: 2 }),
                    password: Joi.string().trim().min(3).max(60),
                    role: Joi.string().trim().max(30),
                    logName: Joi.string().trim().min(6).max(16)
                }),
                homeSlider: Joi.array().items({
                    image: Joi.string().trim().min(3).max(60),
                    textEn: Joi.string().trim().min(3).max(60),
                    textDe: Joi.string().trim().min(3).max(60)
                }),
                web: Joi.object().keys({
                    image: Joi.string().trim().min(3).max(60),
                    textEn: Joi.string().trim().min(3).max(60),
                    textDe: Joi.string().trim().min(3).max(60)
                }),
                schedule: Joi.object().keys({
                    image: Joi.string().trim().min(3).max(60),
                    textEn: Joi.string().trim().min(3).max(60),
                    textDe: Joi.string().trim().min(3).max(60)
                }),
                budget: Joi.object().keys({
                    image: Joi.string().trim().min(3).max(60),
                    textEn: Joi.string().trim().min(3).max(60),
                    textDe: Joi.string().trim().min(3).max(60)
                }),
                finance: Joi.object().keys({
                    image: Joi.string().trim().min(3).max(60),
                    textEn: Joi.string().trim().min(3).max(60),
                    textDe: Joi.string().trim().min(3).max(60)
                }),
                vision: Joi.object().keys({
                    image: Joi.string().trim().min(3).max(60),
                    textEn: Joi.string().trim().min(3).max(60),
                    textDe: Joi.string().trim().min(3).max(60)
                }),
                who: Joi.array().items({
                    image: Joi.string().trim().min(3).max(60),
                    textEn: Joi.string().trim().min(3).max(60),
                    textDe: Joi.string().trim().min(3).max(60)
                }),
                bAccount: Joi.object().keys({
                    bName: Joi.string().trim().min(3).max(60),
                    bNumber: Joi.string().trim().min(3).max(120),
                    bSepa: Joi.string().trim().min(3).max(200),
                    bHolder:Joi.string().trim().min(3).max(60)
                }),  
               
            }),

            loginManagementSchema: Joi.object().keys({
                
                mail: Joi.string().email({ minDomainAtoms: 2 }).required(),
                password: Joi.string().trim().min(3).max(60).required()
            }),

            contactManagementSchema: Joi.object().keys({

                name: Joi.string().trim().min(3).max(60).required(),
                lastName: Joi.string().trim().min(3).max(60).required(),                
                mail: Joi.string().email({ minDomainAtoms: 2 }).required(),
                comment: Joi.string().trim().min(3).max(300).required(),
            }),

            idSchema: Joi.object().keys({
                param: Joi.string().trim().regex(/^[0-9a-fA-F]{24}$/).required()
            
            })
        }
    }
