const { Schema, model } = require('mongoose');
const TipsterSchema = Schema({
    name: {
      type: String,
      required: true
    },
    deport: {
        type: Schema.Types.ObjectId,
        ref: "Deport"
    },
});
module.exports = model('Tipster', TipsterSchema );