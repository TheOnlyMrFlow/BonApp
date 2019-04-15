const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
    res.status(200).json({"Coucou" : 2});
});


router.post('/', (req, res, next) => {

});

module.exports = router;