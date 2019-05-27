const express = require('express');
const router = express.Router(({ mergeParams: true }));

const famillesControllers = require('../../../../../Controllers/familles')

const competencesRoutes = require('./Competences/routes')

router.use('/:familleId/competences', competencesRoutes)

router.get('/', famillesControllers.getFamillesOfComposante)

router.post('/', famillesControllers.postNewFamille)

router.delete('/:familleId', famillesControllers.deleteFamilleById);

//router.get('/', composantesControllers.getComposantesOfSemestre);


// router.use('/semestres', semestresRoutes);

module.exports = router;