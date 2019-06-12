const Competence = require('../Models/Competence');
const Famille = require('../Models/Famille');



exports.getCompetencesOfFamille = (req, res, next) => {

    Famille.findOne({_id: req.params.familleId})
    .populate('competences')
    .exec()
    .then(docFamille => {
        res.status(200).json(docFamille.competences)
    })
    .catch(err => {
        const error = new Error(err)
        error.status = 500
        next(error)
    })

}


exports.postNewCompetence = (req, res, next) => {
    

    const competence = new Competence({
        nom: req.body.nom,
        description: req.body.description || "",
        coefficient: req.body.coefficient || 1    })

    competence.save()
    .then(result => {

    })
    .catch(err => {
        const error = new Error(err)
        error.status = 500
        next(error)
    })

    Famille.update(
        { _id: req.params.familleId},
        { $push: { competences: competence } }
    )
    .exec()
    .then(result => {        
        res.status(201).json(competence)
    })
    .catch(err => {
        const error = new Error(err)
        error.status = 500
        next(error)
    });

}


exports.patchCompetence = (req, res, next) => {

    Competence.findOneAndUpdate(
        {_id: req.params.competenceId},
        {$set : {nom: req.body.nom, description: req.body.description, coefficient: req.body.coefficient, observation: req.body.observation}},
        {new: true}
    )
    .exec()
    .then(docNewCompetence => {
        res.status(200).json(docNewCompetence);
    })

}


exports.deleteCompetence = (req, res, next) => {

    Competence.findByIdAndDelete({_id: req.params.competenceId})
    .exec()
    .then(result => {
        res.status(204).json({msg: "Competence delete"})
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })


}

