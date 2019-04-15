const mongoose = require('mongoose');

const templateSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true},
    definitif: {type: Boolean, default: false},
    semestres: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Semestre',}], default: []},
    niveaux: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Niveau',}], default: []},
});

module.exports = mongoose.model('Template', templateSchema);