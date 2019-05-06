const express = require('express');
const router = express.Router(({ mergeParams: true }));



const semestreControllers = require('../../../Controllers/semestres');


router.get('/', semestreControllers.getAllSemestres);

// router.get('/:semestreId', templateControllers.getTemplateById);

router.post('/', semestreControllers.postNewSemestre);

// router.delete('/semestreId', templateControllers.deleteTemplateById);

// router.use('/semestres', semestresRoutes);

module.exports = router;