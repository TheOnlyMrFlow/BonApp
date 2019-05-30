const Promotion = require('../Models/Promotion');
const Groupe = require('../Models/Groupe');
const mongoose = require('mongoose');



exports.getAllPromotions = (req, res, next) => {
    

    Promotion.find()
    // .populate('semestres')
    // .populate('composantes')
    .populate('template')
    .populate('groupes')
    .exec()
    .then(docs => {

        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
}


exports.postNewPromotion = (req, res, next) => {
    

    const promotion = new Promotion({
        nom: req.body.nom,
        template: req.body.template
    })

    promotion.save()
    .then(result => {

        console.log(result);

        result.populate(
            "template",
            error => {
                res.status(201).json(result)  
            }  
        )


    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })

}

exports.renamePromotion = (req, res, next) => {


    Promotion.findOneAndUpdate(
        {_id: req.params.promotionId},
        { $set: { nom: req.body.nom } },
        {new: true}
    )
    .exec()
    .then(result => {
        
        res.status(200).json(result);

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.deletePromotion = (req, res, next) => {    

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