const mongoose = require('mongoose');

const composanteSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true},
    coefficient: { type: Number, required: true, default: 1},
    familles: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Famille',}], default: []}

});

module.exports = mongoose.model('Composante', composanteSchema);