const Taxonomy = require("../models/taxonomy");
const {response} = require("express");


const sendSuccess = (res = response, data, http_code = 200) => {
    res.status(http_code).json({
        data,
    });
}

const sendError = (res = response, message = 'Error en servidor', http_code = 500, internal_code = 100001,) => {
    res.status(http_code).json({
        internal_code,
        message,
    });
}

const parseAuthUser = async (user) => {
    return {
        username: user.username,
        email: user.email,
        role: user.role.name,
        deports: user.deports.map(deport => deport.name) || [],
        // menu: await Taxonomy.findOne()
    }
}


module.exports = {
    sendSuccess,
    sendError,
    parseAuthUser,
}
