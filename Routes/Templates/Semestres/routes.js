const express = require('express');
const router = express.Router(({ mergeParams: true }));



const semestreControllers = require('../../../Controllers/semestres');


router.get('/', semestreControllers.getAllSemestres);

// router.get('/:semestreId', templateControllers.getTemplateById);

router.post('/', semestreControllers.postNewSemestre);

router.patch('/:semestreId', semestreControllers.renameSemestre)

router.delete('/:semestreId', semestreControllers.deleteSemestreById);

// router.use('/semestres', semestresRoutes);

module.exports = router;