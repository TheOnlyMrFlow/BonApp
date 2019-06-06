const Groupe = require('../Models/Groupe');
const Promotion = require('../Models/Promotion');
const Equipe = require('../Models/Equipe');
const mongoose = require('mongoose');


exports.getEquipeNameById = (req, res, next) => {

    Equipe.findOne({_id:req.params.equipeId})
    .exec()
    .then(doc => {
        res.status(200).json({nom: doc.nom})
    })

}


exports.getAllEquipes = (req, res, next) => {    


    Groupe.findOne({_id: req.params.groupeId})
    .populate({
        path: 'equipes',
        populate: {
            path: 'eleves'
        }
    })
    .exec()
    .then(doc => {
        
        res.status(200).json(doc ? doc.equipes : []);
    })
    .catch(err => {
        next(err);
    });
    
}

exports.postNewEquipe = (req, res, next) => {

    const equipe = new Equipe({
        nom: req.body.nom
    })

    equipe.save()
    .then(result => {

        Groupe.update(
            { _id: req.params.groupeId},
            { $push: { equipes: equipe } }
        )
        .exec()
        .then(result => {
            console.log(result);

            equipe.populate(
                'eleves', 
                error => {
                    if (error) {
                        throw error;
                    }
                    res.status(201).json(equipe)
                }
            )            
        })
        .catch(err => {
            next(err)
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })
}


exports.renameEquipe = (req, res, next) => {

    Groupe.findOne({_id: req.params.groupeId})
    .exec()
    .then(doc => {

        Equipe.findOneAndUpdate(
            {_id: req.params.equipeId},
            { $set: { nom: req.body.nom } },
            {new: true}
        )
        .exec()
        .then(result => {
            
            res.status(200).json(result);

        })
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

