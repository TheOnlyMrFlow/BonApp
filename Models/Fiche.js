const mongoose = require('mongoose');

const ficheSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    notations: { type: [{type: mongoose.Schema.Types.ObjectId, ref: "Notation"}], default: []},
    observation: {type: String, default: "Aucune observation"}

});

module.exports = mongoose.model('Fiche', ficheSchema);