const Composante = require('../Models/Composante');
const Semestre = require('../Models/Semestre');
const Famille = require('../Models/Famille');




exports.getComposantesOfSemestre = (req, res, next) => {


    Semestre.findOne({_id: req.params.semestreId})
    .populate({
        path: 'composantes',
        populate: { path: 'familles' }
    })
    // .populate('composantes')
    // .populate('familles')
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

    Semestre.findOne({_id: idOldSemestre})
    .exec()
    .then(docSemestre => {

        // for (let i = 0; i < docSemestre.composantes.length; i++) {
        //     if (idComposante == docSemestre.composantes[i].toString()) {
        //         throw "Le semestre specifie dans la route ne contient pas la composante a cet id"
        //     }
        // }

        Composante.findOne({
            _id: idComposante
        })
        .populate('familles')
        .exec()
        .then(docComposante => {
            if (req.body.familles != undefined) {
                let newFamilles = req.body.familles
                let lengthNewFamille = newFamilles.length
                for (let i = 0; i < lengthNewFamille; i++) {
                    let exists = false
                    for (let j = 0; j < docComposante.familles.length; j++) {
                        console.log(docComposante.familles[j].nom + " vs " + newFamilles[i])
                        if (docComposante.familles[j].nom == newFamilles[i]) {
                            exists = true;
                        }
                    }

                    console.log(exists)

                    if (!exists) {
                        const f = new Famille({
                            nom: newFamilles[i]
                        })
                        f.save()
                        .then(famille=> {
                            Composante.findOneAndUpdate(
                                {_id: idComposante},
                                {$addToSet: {familles: famille}}
                            ).exec()
                        })
                    }
                }
            }

        })

        Composante.findOneAndUpdate(
            {_id: idComposante},
            { $set: { nom: req.body.nom, coefficient: req.body.coefficient } }
        )
        .exec()
        .then(resUpdateComp => {

            Semestre.findOneAndUpdate(
                {_id: idOldSemestre},
                {$pull: {composantes: idComposante}}
            )
            .exec()
            .then(resUpdateOldSemestre => {
                Semestre.findOneAndUpdate(
                    {_id: idNewSemestre},
                    {$addToSet: {composantes: idComposante}}
                )
                .exec()
                .then(resUpdateNewSemestre => {
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