const express = require('express');
const router = express.Router(({ mergeParams: true }));

const equipesControllers = require('../../../../Controllers/equipes');


router.get('/', equipesControllers.getAllEquipes)

router.post('/', equipesControllers.postNewEquipe)

router.patch('/:equipeId', equipesControllers.renameEquipe);




module.exports = router;