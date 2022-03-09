const Taxonomy = require("../models/taxonomy");


const getTaxonomy = async (req, res = response) => {
    const {slug} = req.params;

    const taxonomy = await Taxonomy.findOne({slug});

    if (!taxonomy) {
        return res.status(404).json({
            ok: false,
            msg: 'Taxonomy not found'
        });
    }

    res.json({
        ok: true,
        taxonomy,
    });
}

const createTaxonomy = async (req, res = response) => {
    const data = req.body

    const taxonomy = new Taxonomy(data);
    await taxonomy.save();

    res.json({
        ok: true,
        taxonomy,
    });
}


module.exports = {
    getTaxonomy,
    createTaxonomy
}
