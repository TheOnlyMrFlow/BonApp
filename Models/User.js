const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    type: { type: String, enum: ['admin', 'tuteur', 'eleve'], required: true},
    equipes: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Equipe',}], default: []},
    equipesFav: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Equipe'}], default: []}
})

module.exports = mongoose.model('User', userSchema);