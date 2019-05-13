const express = require('express');
const router = express.Router(({ mergeParams: true }));


const composantesControllers = require('../../../Controllers/composantes');


router.get('/', composantesControllers.getComposantesOfTemplate);


module.exports = router;