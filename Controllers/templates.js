const Template = require('../Models/Template');
const mongoose = require('mongoose');



exports.getAllTemplates = (req, res, next) => {


    Template.find()
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
}

exports.postNewTemplate = (req, res, next) => {


    console.log(req.body);
    

    const template = new Template({
        nom: req.body.nom,
        definitif: false,
    });

    template.save() 
    .then(result => {
        res.status(201).json({
            message: "Template created"
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}