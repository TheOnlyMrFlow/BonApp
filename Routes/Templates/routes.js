const express = require('express');
const router = express.Router();

const templateControllers = require('../../Controllers/templates');


router.get('/', templateControllers.getAllTemplates);

router.get('/:_id', templateControllers.getTemplateById);

router.post('/', templateControllers.postNewTemplate);

router.delete('/:_id', templateControllers.deleteTemplateById);

module.exports = router;