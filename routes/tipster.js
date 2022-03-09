const {Router} = require('express');
const router = Router();
const {create_tipster, tipsters_by_deport} = require('../controllers/tipster');
const {validarJWT} = require('../middlewares/validar-jwt');

router.post('/create', validarJWT, create_tipster);
router.get('/deport/:deport_id', validarJWT, tipsters_by_deport);

module.exports = router;

