const express = require('express');
const router = express.Router(({ mergeParams: true }));

const templatesRoutes = require('./Templates/routes');
const promotionsRoutes = require('./Promotions/routes');


router.use('/templates', templatesRoutes);

router.use('/promotions', promotionsRoutes);


module.exports = router;