const mongoose = require('mongoose');
const List = require('./list');

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    people: [List.schema]
});

const Party = mongoose.model("Party", partySchema);

module.exports = Party;
