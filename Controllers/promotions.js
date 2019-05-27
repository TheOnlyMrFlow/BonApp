const Promotion = require('../Models/Promotion');
const mongoose = require('mongoose');



exports.getAllPromotions = (req, res, next) => {
    

    Promotion.find()
    // .populate('semestres')
    // .populate('composantes')
    .exec()
    .then(docs => {

        res.status(200).json(docs.map(prom => {
            return {
                "nom": prom.nom,
                "_id": prom._id
            }
        }));
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
}


exports.postNewPromotion = (req, res, next) => {
    

    const promotion = new Promotion({
        nom: req.body.nom
    })

    promotion.save()
    .then(result => {

        console.log(result);

        res.status(201).json({
            nom: promotion.nom,
            _id: promotion._id
        })    


    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })

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