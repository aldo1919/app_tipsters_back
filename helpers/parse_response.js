const Taxonomy = require("../models/taxonomy");

const parseAuthUser = async (user) => {
    return {
        username: user.username,
        email: user.email,
        role: user.role.code,
        menu: await Taxonomy.find({parents_id: user.role}, 'name _id')
    }
}


module.exports = {
    parseAuthUser
}
