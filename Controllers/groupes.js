const Groupe = require('../Models/Groupe');
const Promotion = require('../Models/Promotion');
const Equipe = require('../Models/Equipe');
const mongoose = require('mongoose');



exports.getAllGroupes = (req, res, next) => {    

    Promotion.findOne({_id: req.params.promotionId})
    .populate({
        path: 'groupes',
        populate: { 
            path: 'equipes',
            populate: {
                    path: 'eleves'
            }
        }
    })
    .exec()
    .then(doc => {
        
        res.status(200).json(doc ? doc.groupes : []);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
}

exports.postNewGroupe = (req, res, next) => {

    const groupe = new Groupe({
        nom: req.body.nom
    })

    groupe.save()
    .then(result => {

        Promotion.update(
            { _id: req.params.promotionId},
            { $push: { groupes: groupe } }
        )
        .exec()
        .then(result => {
            console.log(result);

            groupe.populate(
                {
                path: 'groupe',
                    populate: { 
                        path: 'equipes',
                        populate: {
                            path: 'eleves'
                        }
                    }
                },
                error => {
                    res.status(201).json(groupe)
                }
            )
            
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })

    

}

exports.renameGroupe = (req, res, next) => {

    Promotion.findOne({_id: req.params.promotionId})
    .exec()
    .then(doc => {

        Groupe.findOneAndUpdate(
            {_id: req.params.groupeId},
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

