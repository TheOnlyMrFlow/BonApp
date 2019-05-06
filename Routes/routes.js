const express = require('express');
const router = express.Router(({ mergeParams: true }));

const templatesRoutes = require('./Templates/routes');


router.use('/templates', templatesRoutes);



module.exports = router;