const express = require('express');
const router = express.Router(({ mergeParams: true }));


const niveauxControllers = require('../../../Controllers/niveaux');


router.get('/', niveauxControllers.getNiveauxOfSemestre);
router.post('/', niveauxControllers.postNiveauInSemestre);

module.exports = router;