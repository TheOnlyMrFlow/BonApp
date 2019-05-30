const express = require('express');
const router = express.Router(({ mergeParams: true }));

const groupesRoutes = require('./Groupes/routes');

const promotionsControllers = require('../../Controllers/promotions');

router.use('/:promotionId/groupes/', groupesRoutes);

router.get('/', promotionsControllers.getAllPromotions);

router.get('/:promotionId', promotionsControllers.getPromotionNameById);

router.post('/', promotionsControllers.postNewPromotion);

router.patch('/:promotionId', promotionsControllers.renamePromotion);


module.exports = router;