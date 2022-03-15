const User = require('../models/user')
const Taxonomy = require("../models/taxonomy");


const storeUser = async (req, res) => {
    const data = req.body;

    const role_default_user = await Taxonomy.findOne({where: {code: 'system-role-default-user'}})
    data.role_id = role_default_user.id

    await User.storeRequest(res, data)
}

const login = async (req, res) => {
    const data = req.body;
    await User.login(res, data)
}

const renewToken = async (req, res) => {
    const user_id = req.uid;
    await User.refreshToken(res, user_id)
}


module.exports = {
    login,
    renewToken,
    storeUser
}
