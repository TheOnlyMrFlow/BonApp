const Composante = require('../Models/Composante');
const Famille = require('../Models/Famille');


 exports.getFamillesOfComposante = (req, res, next) => {

    console.log('ewrtju')

    Composante.findOne({_id: req.params.composanteId})
    .populate('familles')
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
        
        res.status(201).json(result)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}