const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const Management = require('../models/Management');

module.exports = {

    authManagementLogin: async (req, res, next) => {
        
        const userManagement = req.value.body;
        
        
        const management = await Management.findOne({"credentials" : {$elemMatch: {"mail": {$eq:userManagement.mail} }}})
        
        if(management && bcrypt.compareSync(userManagement.password, management.credentials[0].password)){
              
            jwt.sign(
                    {id: management.id}, 
                    config.get('jwtSecret'), 
                    { expiresIn: 8600}, 
                    (err, token) => {
                        if(err)
                            throw err;
                
                        res.status(201).json({
                        token,
                        management: {
                            manUserId: management.credentials[0].id,
                            redirect: 'management-board',                             
                            logName: management.credentials[0].logName                     
                        } });
                    }) 
            } else{
                res.status(400).json({error: "Management user not found !"})
            }

        
    }

}