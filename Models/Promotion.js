const mongoose = require('mongoose');

const promotionSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nom: { type: String, required: true, unique: true},
    template: {type: mongoose.Schema.Types.ObjectId, ref: 'Template'},
    groupes: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Groupe',}], default: []}
});

module.exports = mongoose.model('Promotion', promotionSchema);

