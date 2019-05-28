const Composante = require('../Models/Composante');
const Famille = require('../Models/Famille');


 exports.getFamillesOfComposante = (req, res, next) => {

    console.log('ewrtju')

    Composante.findOne({_id: req.params.composanteId})
    //.populate('familles')

    .populate({
        path: 'familles',
        populate: { 
            path: 'competences'
        }
    })
    
    .exec()
    .then(docComposante => {
        res.status(200).json(docComposante.familles)
    })

}

exports.postNewFamille = (req, res, next) => {    

    const famille = new Famille({
        nom: req.body.nom
    })

    famille.save()
    .then(result => {

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    })

    Composante.update(
        { _id: req.params.composanteId},
        { $push: { familles: famille } }
    )
    .exec()
    .then(result => {
        console.log(result);
        
        res.status(201).json(famille)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}



exports.deleteFamilleById = (req, res, next) => {    

    Famille.findByIdAndDelete(req.params.familleId)
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