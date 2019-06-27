const router = require('express-promise-router')();


const ManagementController = require('../../controllers/management');
const auth = require('../../middleware/auth');

// Management helpers as validator
const {manValidateParams, manValidateBody, manSchemas } = require('../../helpers/management/manRouteHelpers')
router.route('/')        
    .get(ManagementController.getManagement);       
         
router.route('/add')        
    .post(manValidateBody(manSchemas.addManagementSchema)
            ,ManagementController.addManagement); 
router.route('/contact')        
    .post(manValidateBody(manSchemas.contactManagementSchema)
            ,ManagementController.contactManagement);  

module.exports = router;