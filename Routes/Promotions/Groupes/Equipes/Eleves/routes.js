const express = require('express');
const router = express.Router(({ mergeParams: true }));

const elevesController = require('../../../../../Controllers/eleves');

router.get('/', elevesController.getAllEleves)

router.post('/', elevesController.postNewEleve)

router.delete('/:code', elevesController.deleteEleve)

module.exports = router;