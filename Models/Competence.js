const mongoose = require('mongoose');

const competenceSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true},
    description: {type: String, default: "Aucune description renseignee"},
    coefficient: { type: Number, required: true, default: 1},
});

module.exports = mongoose.model('Competence', competenceSchema);