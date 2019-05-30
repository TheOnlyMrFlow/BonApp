const express = require('express');
const router = express.Router(({ mergeParams: true }));

const equipesRoutes = require('./Equipes/routes');

const groupesControllers = require('../../../Controllers/groupes');

router.use('/:groupeId/equipes', equipesRoutes)

router.get('/', groupesControllers.getAllGroupes);

router.post('/', groupesControllers.postNewGroupe);

router.patch('/:groupeId', groupesControllers.renameGroupe)



module.exports = router;