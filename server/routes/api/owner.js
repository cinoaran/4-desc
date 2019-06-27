// const express = require('express');
// const router = express.Router();
// get rid of try catch block in async await
const router = require('express-promise-router')();

// Owner Controller
const OwnerController = require('../../controllers/owner');
const auth = require('../../middleware/auth');

// Helpers as validator
const {memValidateParams, memValidateBody, memSchemas } = require('../../helpers/members/memRouteHelpers')

router.route('/')
    .get(OwnerController.index)
    .post(auth, memValidateBody(memSchemas.ownerSchema)
        ,OwnerController.addNewOwner);



module.exports = router;