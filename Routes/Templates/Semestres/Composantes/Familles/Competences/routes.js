const express = require('express');
const router = express.Router(({ mergeParams: true }));

const competencesControllers = require('../../../../../../Controllers/competences')


router.get('/', competencesControllers.getCompetencesOfFamille);

router.post('/', competencesControllers.postNewCompetence);



module.exports = router;