const mongoose = require('mongoose');

const groupeSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    // nom: { type: String, required: true, unique: true},
    // competences: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competence',}], default: []}
});

module.exports = mongoose.model('Groupe', groupeSchema);
