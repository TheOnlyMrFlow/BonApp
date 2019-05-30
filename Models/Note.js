const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    niveau: { type: mongoose.Schema.Types.ObjectId, ref: 'Niveau'},
    date: { type: Date, required: true, default: Date.now}

});

module.exports = mongoose.model('Note', noteSchema);