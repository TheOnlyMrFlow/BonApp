const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    nom: { type: String, required: true},
    prenom: { type: String, required: true},
    genre: { type: String, enum: ['M', 'F'], required: true},
    type: { type: String, enum: ['admin', 'tuteur', 'eleve'], required: true},
    mail: { type: String},
    password: { type: String},
    code: {type: Number, required: true, unique: true},
    equipesFav: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Equipe'}], default: []}

})

module.exports = mongoose.model('User', userSchema);