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

exports.getTemplateById = (req, res, next) => {
    

    Template.find({_id: req.params.templateId})
    .exec()
    .then(docs => {
        res.status(200).json(docs[0]);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
    
}


exports.renameTemplate = (req, res, next) => {

    Template.findOneAndUpdate(
        {_id: req.params.templateId},
        { $set: { nom: req.body.nom } },
        {new: true}
    )
    .exec()
    .then(result => {
        
        res.status(200).json(result);

    })
    .catch(err => {
        next(err)
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
        console.log(result);
        
        res.status(201).json(template)    
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });

}

exports.deleteTemplateById = (req, res, next) => {

    console.log(req.params);
    

    Template.findByIdAndDelete(req.params.templateId)
    .exec()
    .then(result => {
        res.status(204).json({});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })

}