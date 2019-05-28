const express = require('express');
const router = express.Router(({ mergeParams: true }));

const competencesControllers = require('../../../../../../Controllers/competences')


router.get('/', competencesControllers.getCompetencesOfFamille);

router.post('/', competencesControllers.postNewCompetence);

router.patch('/:competenceId', competencesControllers.patchCompetence)

router.delete('/:competenceId', competencesControllers.deleteCompetence)



module.exports = router;