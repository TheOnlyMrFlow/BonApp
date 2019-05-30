const express = require('express');
const router = express.Router(({ mergeParams: true }));

const groupesControllers = require('../../../Controllers/groupes');


router.get('/', groupesControllers.getAllGroupes);

router.post('/', groupesControllers.postNewGroupe);

router.patch('/:groupeId', groupesControllers.renameGroupe)



module.exports = router;