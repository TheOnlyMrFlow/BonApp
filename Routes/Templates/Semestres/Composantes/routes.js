const express = require('express');
const router = express.Router(({ mergeParams: true }));


const composantesControllers = require('../../../../Controllers/composantes');


router.get('/', composantesControllers.getComposantesOfSemestre);
router.post('/', composantesControllers.postComposanteInSemestre);
router.patch('/:composanteId', composantesControllers.patchComposante);
router.delete('/:composanteId', composantesControllers.deleteComposanteById);



// router.use('/semestres', semestresRoutes);

module.exports = router;