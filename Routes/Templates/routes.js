const express = require('express');
const router = express.Router(({ mergeParams: true }));

const semestresRoutes = require('./Semestres/routes');


const templateControllers = require('../../Controllers/templates');


router.get('/', templateControllers.getAllTemplates);

router.get('/:templateId', templateControllers.getTemplateById);

router.post('/', templateControllers.postNewTemplate);

router.delete('/:templateId', templateControllers.deleteTemplateById);

router.use('/:templateId/semestres', semestresRoutes);

module.exports = router;