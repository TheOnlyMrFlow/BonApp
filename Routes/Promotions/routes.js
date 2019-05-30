const express = require('express');
const router = express.Router(({ mergeParams: true }));

const promotionsControllers = require('../../Controllers/promotions');


router.get('/', promotionsControllers.getAllPromotions);

router.post('/', promotionsControllers.postNewPromotion);

router.patch('/:promotionId', promotionsControllers.renamePromotion);


module.exports = router;