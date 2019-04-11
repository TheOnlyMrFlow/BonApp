const express = require('express');
const router = express.Router();

const templatesRoutes = require('./Templates/routes');


router.use('/templates', templatesRoutes);



module.exports = router;