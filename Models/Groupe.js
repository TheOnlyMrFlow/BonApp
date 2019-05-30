const mongoose = require('mongoose');

const groupeSchema = mongoose.Schema({

    nom: { type: String, required: true, unique: true},
    equipes: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipe',}], default: []}
})

module.exports = mongoose.model('Groupe', groupeSchema);