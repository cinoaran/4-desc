const bcrypt = require('bcryptjs');
const config = require('config');
const nodemailer = require('nodemailer');


const Management = require('../models/Management');




module.exports = {

    getManagement: async (req, res, next) => {
        const management = await Management.find({}).select('-credentials');                      
        res.status(200).json(management);        
    },

    addManagement : async (req, res, next) => {
            
        const newManagement = new Management(req.value.body);
        const { credentials, details } = newManagement;
        console.log(credentials[0].password)
                    
        // Create Salt & Hash
        await bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(credentials[0].password, salt, (err, hash) => {
                if(err) throw err;
                newManagement.credentials[0].password = hash;
                newManagement.credentials[0].mail = credentials[0].mail;                    
                newManagement.save()
                    .then(management => {
                                                   
                        res.status(200).json({success: true, company: management.details.companyName})
                    })
                    .catch(err => console.log(err));
                })
        })  
       
    },
    contactManagement: async (req, res, next) => {
        
       
        output = `  <p>You have a new contact request</p>
                        <h3>Contact Details</h3>
                        <ul>
                            <li>Name: ${req.body.name}</li>                           
                            <li>Email: ${req.body.mail}</li>                            
                        </ul>
                        <h3>Massage</h3>
                        <p>${req.body.comment}</p>`;
           
        let transporter = nodemailer.createTransport({
            host: config.get("mailerHost"),
            port: config.get("mailerPort"),
            secure: false,
            requireTLS: true,
            auth: {
                user: config.get("mailerAuthUser"),
                pass: config.get("mailerAuthPass")
            }
        
            });
            

        // setup email data with unicode symbols
        let mailOptions = {
            from: '"Room Desc " <webmaster@cityapartsberlin.de>', // sender address
            to: 'webmaster@cityapartsberlin.de', // list of receivers
            subject: 'Contact to Room Desc Company', // Subject line
            text: 'Hello world?', // plain text body
            html: output // Take the output variable
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
                              
            res.status(200).json({ msg: 'Hello Contact'});        
        })
    }
}