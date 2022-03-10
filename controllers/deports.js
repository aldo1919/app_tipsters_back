const Taxonomy = require("../models/taxonomy");
const {response} = require("express");


const getDeports = async (req, res = response) => {
    const {fields = ''} = req.params

    return await Taxonomy.find({group: 'tags', type: 'deport'}, fields)
}

module.exports = {
    getDeports
}
