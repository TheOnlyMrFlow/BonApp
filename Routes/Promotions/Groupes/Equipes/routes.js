const express = require('express');
const router = express.Router(({ mergeParams: true }));

const elevesRoutes = require('./Eleves/routes')

const equipesControllers = require('../../../../Controllers/equipes');

router.use('/:equipeId/eleves', elevesRoutes)

router.get('/', equipesControllers.getAllEquipes)

router.post('/', equipesControllers.postNewEquipe)

router.patch('/:equipeId', equipesControllers.renameEquipe)

module.exports = router;