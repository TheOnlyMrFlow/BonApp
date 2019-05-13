const Niveau = require('../Models/Niveau');
const Template = require('../Models/Template');
const mongoose = require('mongoose');



exports.getNiveauxOfTemplate = (req, res, next) => {



    Template.findOne({_id: req.params.templateId})
    //.populate('niveaux')
    .populate('niveaux')
    .exec()
    .then(doc => {
        res.status(200).json(doc.niveaux);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.postNiveauInTemplate = (req, res, next) => {


    // console.log(req.params);

    const niveau = new Niveau({
        nom: req.body.nom,
        note: req.body.note
    })

    niveau.save()
        .then(result => {



        })
        .catch(err => {
            res.status(500).json({ error: err });
        })


    Template.update(
        { _id: req.params.templateId },
        { $push: { niveaux: niveau } }
    )
    .exec()
    .then(result2 => {
        res.status(201).json(result2)
    })


}

exports.patchNiveau = (req, res, next) => {



    Template.findOne({_id: req.params.templateId})
    .exec()
    .then(doc => {

        // console.log(doc.semestres);
        // console.log('' + req.params.semestreId)

        // if (!doc.semestres.indexOf('' + req.params.semestreId) > -1) {
        //     throw {"error": "Ce template ne continent pas de semestre avec cet id"}
        // }

        Niveau.findOneAndUpdate(
            {_id: req.params.niveauId},
            { $set: { nom: req.body.nom, note: req.body.note } }
        )
        .exec()
        .then(result => {

            res.status(200).json({nom: req.body.nom, note: req.body.note});

        })

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.deleteNiveauById = (req, res, next) => {

    Niveau.findByIdAndDelete(req.params.niveauId)
    .exec()
    .then(result => {
        Template.update(
            { _id: req.params.templateId},
            { $pull: { niveaux: { _id: req.params.niveauId } } }
        )
        .exec()
        res.status(204).json({});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })

}