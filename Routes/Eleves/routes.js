const express = require('express');
const router = express.Router(({ mergeParams: true }));

const elevesControllers = require('../../Controllers/eleves');



router.get('/:code', elevesControllers.getEleveById);


module.exports = router;