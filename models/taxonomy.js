const {Schema, model} = require('mongoose');
const TaxonomySchema = Schema({
    name: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        ref: "Parent"
    },
});

TaxonomySchema.method('toJSON', function () {
    const {__v, _id, ...object} = this.toObject();
    object.uid = _id;

    return object;
})

module.exports = model('Taxonomy', TaxonomySchema);
