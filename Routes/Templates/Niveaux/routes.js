const express = require('express');
const router = express.Router(({ mergeParams: true }));


const niveauxControllers = require('../../../Controllers/niveaux');


router.get('/', niveauxControllers.getNiveauxOfTemplate);
router.post('/', niveauxControllers.postNiveauInTemplate);
router.patch('/:niveauId', niveauxControllers.patchNiveau);
router.delete('/:niveauId', niveauxControllers.deleteNiveauById);


module.exports = router;