const Semestre = require('../Models/Semestre');
const Template = require('../Models/Template');
const mongoose = require('mongoose');



exports.getAllSemestres = (req, res, next) => {


    console.log(req.params);
    

    Template.findOne({_id: req.params.templateId})
    .populate({
        path: 'semestres',
        populate: { path: 'composantes' }
    })
    // .populate('semestres')
    // .populate('composantes')
    .exec()
    .then(doc => {
        res.status(200).json(doc.semestres);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
}

// exports.getSemestreById = (req, res, next) => {


//     Semestre.find({_id: req.params._id})
//     .exec()
//     .then(docs => {
//         res.status(200).json(docs[0]);
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error:err});
//     });
    
// }

exports.postNewSemestre = (req, res, next) => {


    console.log(req.params);
    

    const semestre = new Semestre({
        nom: req.body.nom
    })

    semestre.save()
    .then(result => {

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })

    Template.update(
        { _id: req.params.templateId},
        { $push: { semestres: semestre } }
    )
    .exec()
    .then(result => {
        console.log(result);
        
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.renameSemestre = (req, res, next) => {

    Template.findOne({_id: req.params.templateId})
    .exec()
    .then(doc => {

        // console.log(doc.semestres);
        // console.log('' + req.params.semestreId)

        // if (!doc.semestres.indexOf('' + req.params.semestreId) > -1) {
        //     throw {"error": "Ce template ne continent pas de semestre avec cet id"}
        // }

        Semestre.findOneAndUpdate(
            {_id: req.params.semestreId},
            { $set: { nom: req.body.nom } }
        )
        .exec()
        .then(result => {
            
            res.status(200).json({nom: req.body.nom});

        })
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.deleteSemestreById = (req, res, next) => {    

    Semestre.findByIdAndDelete(req.params.semestreId)
    .exec()
    .then(result => {
        // Template.update(
        //     { _id: req.params.templateId},
        //     { $pull: { _id: req.params.semestreId } }
        // )
        // .exec()
        res.status(204).json({});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })

}