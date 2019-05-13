const express = require('express');
const router = express.Router(({ mergeParams: true }));


const niveauxControllers = require('../../../Controllers/niveaux');


router.get('/', niveauxControllers.getNiveauxOfTemplate);
router.post('/', niveauxControllers.postNiveauInTemplate);

module.exports = router;