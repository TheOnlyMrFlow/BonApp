const express = require('express');
const router = express.Router(({ mergeParams: true }));

const templatesRoutes = require('./Templates/routes');
const promotionsRoutes = require('./Promotions/routes');
const elevesRoutes = require('./Eleves/routes');


router.use('/templates', templatesRoutes);

router.use('/promotions', promotionsRoutes);

router.use('/eleves', elevesRoutes);


module.exports = router;