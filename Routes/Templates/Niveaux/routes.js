const express = require('express');
const router = express.Router(({ mergeParams: true }));


const niveauxControllers = require('../../../Controllers/niveaux');


router.get('/', niveauxControllers.getNiveauxOfTemplate);
router.post('/', niveauxControllers.postNiveauInTemplate);
router.patch('/', niveauxControllers.patchNiveau);


module.exports = router;