const {Model, DataTypes} = require('sequelize');
const sequelize = require('../database/sequelize.js')
const bcrypt = require('bcryptjs');

const Taxonomy = require('./taxonomy')

const {sendSuccess, sendError, parseAuthUser} = require('../helpers/parse_response')
const {generateJWT} = require('../helpers/jwt');
const {response} = require("express");


class User extends Model {
}

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    createdAt: {
        type: DataTypes.DATE,
    },
    updatedAt: {
        type: DataTypes.DATE,
    },
}, {
    sequelize,
    underscored: false,
    modelName: 'user',
    tableName: 'users',
});

User.belongsTo(Taxonomy, {foreignKey: 'role_id', as: 'role'});

User.belongsToMany(Taxonomy, {through: 'user_deports', as: 'deports'});
User.belongsToMany(Taxonomy, {through: 'user_deports', as: 'UserDeports'});

Taxonomy.belongsToMany(User, {through: 'user_deports', as: 'deports'});

User.storeRequest = async (res = response, data) => {
    try {
        const isEmailAvailable = await User.findOne({where: {email: data.email}})
        if (isEmailAvailable)
            return sendError(res, 'El correo ya está registrado.', 422)

        const salt = bcrypt.genSaltSync();
        data.password = bcrypt.hashSync(data.password, salt);

        let new_user = await User.create(data);

        const token = await generateJWT(new_user.id);

        const dbUser = await User.findOne({
            where: {email: new_user.email},
            include: [
                {model: Taxonomy, as: 'role', attributes: ['name']},
                {model: Taxonomy, as: 'deports', attributes: ['name']},
            ]
        })

        const user = await parseAuthUser(dbUser)

        const deports = await Taxonomy.findAll({
            attributes: ['code', 'name'],
            where: {group: 'tags', type: 'deport'}
        })

        return sendSuccess(res, {
            user,
            token,
            message: "Usuario creado con éxito.",
            deports,
        })
    } catch (error) {
        return sendError(res, 'Hable con el administrador.')
    }
}

User.login = async (res, data) => {
    try {
        const dbUser = await User.findOne({
            attributes: ['username', 'email', 'password'],
            where: {email: data.email},
            include: [
                {model: Taxonomy, as: 'role', attributes: ['name']},
                {model: Taxonomy, as: 'deports', attributes: ['name']},
            ]
        });

        if (!dbUser)
            return sendError(res, 'Email no encontrado.', 401)

        const validPassword = bcrypt.compareSync(data.password, dbUser.password);
        if (!validPassword)
            return sendError(res, 'La contraseña no es valida', 401)

        const token = await generateJWT(dbUser.id);

        const user = await parseAuthUser(dbUser)

        const deports = await Taxonomy.findAll({
            attributes: ['code', 'name'],
            where: {group: 'tags', type: 'deport'}
        })

        return sendSuccess(res, {
            user,
            token,
            deports,
        })
    } catch (error) {
        return sendError(res, 'Hable con el administrador.')
    }
}

User.refreshToken = async (res, user_id) => {
    try {
        const dbUser = await User.findOne({
            where: {id: user_id},
            include: [
                {model: Taxonomy, as: 'role', attributes: ['name']},
                {model: Taxonomy, as: 'deports', attributes: ['name']},
            ]
        });

        const token = await generateJWT(user_id)

        const user = await parseAuthUser(dbUser)

        const deports = await Taxonomy.findAll({
            attributes: ['code', 'name'],
            where: {group: 'tags', type: 'deport'}
        })


        return sendSuccess(res, {
            user,
            token,
            deports,
        })
    } catch (e) {
        return sendError(res, 'Hable con el administrador.')
    }
}

module.exports = User;
