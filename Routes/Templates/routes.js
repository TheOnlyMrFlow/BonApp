const express = require('express');
const router = express.Router(({ mergeParams: true }));

const semestresRoutes = require('./Semestres/routes');
const composantesRoutes = require('./Composantes/routes');
const niveauxRoutes = require('./Niveaux/routes');


const templateControllers = require('../../Controllers/templates');



router.get('/', templateControllers.getAllTemplates);

router.get('/:templateId', templateControllers.getTemplateById);

router.post('/', templateControllers.postNewTemplate);

router.delete('/:templateId', templateControllers.deleteTemplateById);

router.use('/:templateId/semestres', semestresRoutes);
router.use('/:templateId/niveaux', niveauxRoutes);
router.use('/:templateId/composantes', composantesRoutes);

module.exports = router;