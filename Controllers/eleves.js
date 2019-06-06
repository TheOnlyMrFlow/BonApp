const Groupe = require('../Models/Groupe');
const Promotion = require('../Models/Promotion');
const Equipe = require('../Models/Equipe');
const User = require('../Models/User');
const Notation = require('../Models/Notation');
const Template = require('../Models/Template');
const mongoose = require('mongoose');



exports.getAllEleves = (req, res, next) => {    


    Equipe.findOne({_id: req.params.equipeId})
    .populate('eleves')
    .exec()
    .then(doc => {
        
        res.status(200).json(doc ? doc.eleves : []);
    })
    .catch(err => {
        next(err);
    });
}



exports.postNewEleve = (req, res, next) => {

    const eleve = new User({
        nom: req.body.nom,
        prenom: req.body.prenom,
        genre: req.body.genre,
        type: 'eleve',
        code: req.body.code
    })

    eleve.save()
    .then(resultEleve => {

        Equipe.findOneAndUpdate(
            { _id: req.params.equipeId},
            { $push: { eleves: eleve } },
            {new: true}
        )
        .exec()
        .then(docEquipe => {

            console.log(docEquipe)

            Promotion.findOne({"groupes.equipes": docEquipe._id})
            .exec()
            .then(docPromo => {

                Template.findOne({_id: docPromo.template})
                .populate({
                    path: 'semestres',
                    populate: { 
                        path: 'composantes',
                        populate: { 
                            path: 'competences'
                        }
                    }
                })
                .exec()
                .then(docTemplate => {
                    console.log(docTemplate)
                })

                const notation = new Notation({
                    eleve: req.params.code,
    
                })
                
                
                
            })
            
            res.status(201).json(eleve)
                        
        })
        .catch(err => {
            next(err)
        });

    })
    .catch(err => {
        next(err)
    })
}


exports.patchEleve = (req, res, next) => {

    Equipe.findOne({_id: req.params.equipeId})
    .exec()
    .then(docEquipe => {

        User.findOneAndUpdate(
            {code: req.params.code},
            { $set: { nom: req.body.nom, prenom: req.body.prenom, code: req.body.code, genre: req.body.genre } },
            {new: true}
        )
        .exec()
        .then(docUser => {
            res.status(200).json(docUser);
            
        })
        
    })
    .catch(err => {
        next(err);
    });

}

exports.deleteEleve = (req, res, next) => {

    User.findOneAndDelete({code: req.params.code})
    .exec()
    .then(result => {
        res.status(204).json({});
    })
    .catch(err => {
        next(err);
    })

}


// exports.renameEquipe = (req, res, next) => {

//     Groupe.findOne({_id: req.params.groupeId})
//     .exec()
//     .then(doc => {

//         Equipe.findOneAndUpdate(
//             {_id: req.params.equipeId},
//             { $set: { nom: req.body.nom } },
//             {new: true}
//         )
//         .exec()
//         .then(result => {
            
//             res.status(200).json(result);

//         })
        
//     })
//     .catch(err => {
//         console.log(err);
//         res.status(500).json({error:err});
//     });

// }

