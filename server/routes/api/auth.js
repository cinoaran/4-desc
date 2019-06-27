const router = require('express-promise-router')();


const AuthController = require('../../controllers/auth');
const auth = require('../../middleware/auth');

// Management helpers as validator
const {manValidateParams, manValidateBody, manSchemas } = require('../../helpers/management/manRouteHelpers')
const {memValidateParams, memValidateBody, memSchemas } = require('../../helpers/members/memRouteHelpers')
       
router.route('/management')        
    .post(manValidateBody(manSchemas.loginManagementSchema)
        ,AuthController.authManagementLogin);         
        
module.exports = router;