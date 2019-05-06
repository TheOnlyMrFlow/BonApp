const mongoose = require('mongoose');

const semestreSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true},
    composantes: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Composante',}], default: []}

});

module.exports = mongoose.model('Semestre', semestreSchema, 'semestre');