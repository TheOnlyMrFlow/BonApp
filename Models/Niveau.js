const mongoose = require('mongoose');

const niveauSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true},
    valeur: { type: Number, required: true}

});

module.exports = mongoose.model('Niveau', niveauSchema);