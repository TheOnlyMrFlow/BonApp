const Semestre = require('../Models/Semestre');
const Template = require('../Models/Template');
const mongoose = require('mongoose');



exports.getAllSemestres = (req, res, next) => {


    console.log(req.params);
    

    Template.find({_id: req.params.templateId})
    .exec()
    .then(docs => {
        res.status(200).json(docs.semestres);
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

// exports.deleteTemplateById = (req, res, next) => {

//     console.log(req.params);
    

//     Template.findByIdAndDelete(req.params._id)
//     .exec()
//     .then(result => {
//         res.status(204).json({});
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error: err});
//     })

// }