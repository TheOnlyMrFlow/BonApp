const mongoose = require('mongoose');

const ficheSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true},
    notations: { type: Number, required: true},
    observation: {type: String, default: "Aucune observation"}

});

module.exports = mongoose.model('Fiche', ficheSchema);