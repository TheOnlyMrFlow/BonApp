const express = require('express');
const router = express.Router(({ mergeParams: true }));

const famillesControllers = require('../../../../../Controllers/familles')


router.get('/', famillesControllers.getFamillesOfComposante)

//router.get('/', composantesControllers.getComposantesOfSemestre);


// router.use('/semestres', semestresRoutes);

module.exports = router;