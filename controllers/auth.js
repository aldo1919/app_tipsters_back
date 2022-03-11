const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const Taxonomy = require('../models/taxonomy');

const {getDeports} = require('../controllers/deports')
const {generateJWT} = require('../helpers/jwt');

const {parseAuthUser} = require('../helpers/parse_response')


const createUser = async (req, res = response) => {
    const data = req.body;

    try {
        const existeEmail = await Usuario.findOne({email: data.email});
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado.'
            });
        }

        // Add role default user
        const role_default_user = await Taxonomy.findOne({code: 'system-role-default-user'})
        data.role = role_default_user.id

        let new_user = new Usuario(data);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        new_user.password = bcrypt.hashSync(data.password, salt);

        await new_user.save();

        // Generate JWT
        const token = await generateJWT(new_user.id);

        const dbUser = await Usuario.findOne({email: new_user.email}).populate('role')
        const user = await parseAuthUser(dbUser)

        const deports = await getDeports({params: {fields: 'name _id'}})

        res.json({
            ok: true,
            usuario: user,
            deports,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const login = async (req, res = response) => {
    const {email, password} = req.body;

    try {

        const dbUser = await Usuario.findOne({email}).populate('role');

        if (!dbUser) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Validate password
        const validPassword = bcrypt.compareSync(password, dbUser.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es valida'
            });
        }

        // Generate JWT
        const token = await generateJWT(dbUser.id);

        const deports = await getDeports({params: {fields: 'name _id'}})

        const user = await await parseAuthUser(dbUser)

        res.json({
            ok: true,
            // usuario: dbUser,
            usuario: user,
            deports: deports,
            token
        });

    } catch (error) {

        return res.status(500).json({
            ok: false,
            error: error.message || 'No se identificó el mensaje.',
            msg: 'Hable con el administrador'
        })

    }
}

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    const dbUser = await Usuario.findById(uid).populate('role')
    const user = await parseAuthUser(dbUser)

    const token = await generateJWT(uid)

    const deports = await getDeports({params: {fields: 'name _id'}})

    res.json({
        ok: true,
        usuario: user,
        deports,
        token
    });
}

module.exports = {
    createUser,
    login,
    renewToken
}
