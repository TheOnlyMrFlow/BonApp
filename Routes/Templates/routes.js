const express = require('express');
const router = express.Router();

const templateControllers = require('../../Controllers/templates');


router.get('/', templateControllers.getAllTemplates);


router.post('/', templateControllers.postNewTemplate);

module.exports = router;