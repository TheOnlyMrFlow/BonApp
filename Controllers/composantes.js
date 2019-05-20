const Composante = require('../Models/Composante');
const Semestre = require('../Models/Semestre');
const Template = require('../Models/Template');
const mongoose = require('mongoose');



exports.getComposantesOfSemestre = (req, res, next) => {


    Semestre.findOne({_id: req.params.semestreId})
    .populate('composantes')
    .exec()
    .then(doc => {
        
        res.status(200).json(doc.composantes);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}


exports.postComposanteInSemestre = (req, res, next) => {


    console.log(req.params);

    const composante = new Composante({
        nom: req.body.nom,
        coefficient: req.body.coefficient,
    })

    composante.save()
        .then(result => {

            Semestre.update(
                { _id: req.params.semestreId },
                { $push: { composantes: composante } }
            )
            .exec()
            .then(result2 => {
                res.status(201).json(result2)
            })


        })
        .catch(err => {
            res.status(500).json({ error: err });
        })


    


}

exports.patchComposante = (req, res, next) => {

    let idOldSemestre = req.params.semestreId
    let idNewSemestre = req.body.semestre
    let idComposante = req.params.composanteId
    console.log(idOldSemestre)
    console.log(idNewSemestre)
    console.log(idComposante)

    Semestre.findOne({_id: idOldSemestre})
    .exec()
    .then(docSemestre => {

        // console.log(doc.semestres);
        // console.log('' + req.params.semestreId)

        // if (!doc.semestres.indexOf('' + req.params.semestreId) > -1) {
        //     throw {"error": "Ce template ne continent pas de semestre avec cet id"}
        // }

        Composante.findOneAndUpdate(
            {_id: idComposante},
            { $set: { nom: req.body.nom, coefficient: req.body.coefficient } }
        )
        .exec()
        .then(resUpdateComp => {

            console.log("Update comp : " + resUpdateComp)

            Semestre.findOneAndUpdate(
                {_id: idNewSemestre},
                {$addToSet: {composantes: idComposante}}
            )
            .exec()
            .then(resUpdateNewSemestre => {
                console.log("Update new semestre : " + resUpdateNewSemestre)
                Semestre.findOneAndUpdate(
                    {_id: idOldSemestre},
                    {$pull: {composantes: idComposante}}
                )
                .exec()
                .then(resUpdateOldSemestre => {
                    console.log("Update old semestre : " + resUpdateOldSemestre)
                    res.status(200).json({nom: req.body.nom, coefficient: req.body.coefficient});
                })
            })


            

        })

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.deleteComposanteById = (req, res, next) => {

    Composante.findByIdAndDelete(req.params.composanteId)
    .exec()
    .then(result => {
        Semestre.update(
            { _id: req.params.semestreId},
            { $pull: { composantes: { _id: req.params.composanteId } } }
        )
        .exec()
        res.status(204).json({});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })

}