const Tipster = require("../models/tipster");
const Deport = require("../models/deport");

const create_tipster = async( req, res = response) => {
    const deport = await Deport.findById("62203b6ee31be49c10476a60");
    const new_tipster = new Tipster({
        name:"Peruvian Picks",
        deport:deport._id
    })
    const savedTipster = await new_tipster.save();
    deport.tipsters = deport.tipsters.concat(savedTipster._id);
    await deport.save();
    res.json({
        ok: true,
        savedTipster,
    });
}
const tipsters_by_deport = async( req, res = response) => {
    const deport_id = req.param('deport_id');
    const tipsters = await Tipster.find({deport:deport_id});
    res.json({
        ok: true,
        tipsters,
    });
}
module.exports = {
    create_tipster,
    tipsters_by_deport
}
