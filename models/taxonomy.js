const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize')
const {response} = require("express");
const bcrypt = require("bcryptjs");

const {sendError, parseAuthUser, sendSuccess} = require("../helpers/parse_response");

const {generateJWT} = require("../helpers/jwt");

class Taxonomy extends Model {
}

Taxonomy.init({
    group: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    position: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    modelName: 'taxonomy',
    tableName: 'taxonomies',
});

Taxonomy.storeRequest = async (res = response, data) => {
    try {
        const taxonomy = await Taxonomy.create(data);

        return sendSuccess(res, {
            taxonomy,
        })
    } catch (error) {
        return sendError(res, 'Hable con el administrador.')
    }
}


module.exports = Taxonomy;
