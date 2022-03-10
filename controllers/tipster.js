const {response} = require('express');

const Tipster = require("../models/tipster");

const create_tipster = async (req, res = response) => {
    const data = req.body
    // console.log(data.deports)

    const tipster = new Tipster(data)
    await tipster.save()

    res.json({
        ok: true,
        tipster,
    });
}

const tipsters_by_deport = async (req, res = response) => {
    const {deport_id} = req.params
    const tipsters = await Tipster.find({deports: deport_id})
        .populate('deports', 'name -_id')

    res.json({
        ok: true,
        tipsters,
    });
}

module.exports = {
    create_tipster,
    tipsters_by_deport
}
