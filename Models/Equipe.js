const mongoose = require('mongoose');

const equipeSchema = mongoose.Schema({

    nom: { type: String, required: true, unique: true},
    eleves: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}], default: []}
});

module.exports = mongoose.model('Equipe', equipeSchema);