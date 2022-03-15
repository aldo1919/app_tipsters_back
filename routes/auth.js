const {Router} = require('express');
const {check} = require('express-validator');
const {login, renewToken} = require('../controllers/auth');
const {storeUser} = require('../controllers/auth');
const {validateFields} = require('../middlewares/validateFields');
const {validateJWT} = require('../middlewares/validateJWT');
const router = Router();


router.post('/new', [
    check('username', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validateFields
], storeUser);

router.post('/', [
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
], login);


router.get('/renew', validateJWT, renewToken);


module.exports = router;
