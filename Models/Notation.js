const mongoose = require('mongoose');

const notationSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    eleve: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    competence: {type: mongoose.Schema.Types.ObjectId, ref: "Competence"},
    observation: {type: String, default: "Aucune observation"},
    note: {type: mongoose.Schema.Types.ObjectId, ref: "Note"},
    historique: {type: [{type: mongoose.Schema.Types.ObjectId, ref: "Note"}], default: []},
});

module.exports = mongoose.model('Notation', notationSchema);

