const express = require('express');
const router = express.Router(({ mergeParams: true }));

const composantesRoutes = require('./Composantes/routes');


const semestreControllers = require('../../../Controllers/semestres');

router.use('/:semestreId/composantes', composantesRoutes);

router.get('/', semestreControllers.getAllSemestres);

// router.get('/:semestreId', templateControllers.getTemplateById);

router.post('/', semestreControllers.postNewSemestre);

router.patch('/:semestreId', semestreControllers.renameSemestre)

router.delete('/:semestreId', semestreControllers.deleteSemestreById);

// router.use('/semestres', semestresRoutes);

module.exports = router;