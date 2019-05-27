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