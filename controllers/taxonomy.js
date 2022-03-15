const Taxonomy = require("../models/taxonomy");
const {sendError, sendSuccess} = require("../helpers/parse_response");


const getTaxonomy = async (req, res) => {
    const data = req.params;
    try {
        const taxonomy = await Taxonomy.findOne({where: {slug: data.slug}});

        if (!taxonomy)
            return sendError(res, 'Taxonomy not found.', 404)

        return sendSuccess(res, {
            taxonomy,
        })
    } catch (error) {
        return sendError(res, 'Hable con el administrador.')
    }
}

const createTaxonomy = async (req, res) => {
    const data = req.body

    await Taxonomy.storeRequest(res, data)
}

module.exports = {
    getTaxonomy,
    createTaxonomy,
}
