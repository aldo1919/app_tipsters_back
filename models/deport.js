const { Schema, model } = require('mongoose');

const DeportSchema = Schema({
    name: {
        type: String,
        required: true
    },
    tipsters:[
        {
            type:Schema.Types.ObjectId,
            ref:'Tipster'
        }
    ]
});

DeportSchema.method('toJSON', function() {
    const { __v, _id,...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Deport', DeportSchema );