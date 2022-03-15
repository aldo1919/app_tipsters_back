const Taxonomy = require("../models/taxonomy");
const User = require("../models/user");

const {sendSuccess, sendError} = require("../helpers/parse_response");

const store = async (req, res) => {
    const data = req.body;

    const role_default_user = await Taxonomy.findOne({where: {code: 'system-role-tipster-user'}})
    data.role_id = role_default_user.id

    await User.storeRequest(res, data)
}

const tipsters_by_deport = async (req, res) => {
    let deports = req.query.deports

    if (deports === undefined || deports.length === 0) return sendSuccess(res, [])

    try {
        const role_default_user = await Taxonomy.findOne({where: {code: 'system-role-tipster-user'}})

        const tipsters = await User.findAll({
            attributes: ['username'], where: {role_id: role_default_user.id},
            include: [
                {
                    model: Taxonomy,
                    as: 'deports',
                    attributes: ['name', 'id'],
                    through: {attributes: []},
                    required: true
                },
                {
                    model: Taxonomy,
                    as: 'UserDeports',
                    attributes: [],
                    where: {id: deports},
                    required: true
                }],
        })

        return sendSuccess(res, tipsters)
    } catch (e) {
        console.log(e.message)
        return sendError(res, 'Hable con el administrador.')
    }
}

module.exports = {
    store, tipsters_by_deport
}
