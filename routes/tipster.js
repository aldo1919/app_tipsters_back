const {Router} = require('express');
const router = Router();
const {check} = require("express-validator");

const {store, tipsters_by_deport} = require('../controllers/tipster');
const {validateJWT} = require('../middlewares/validateJWT');

router.post('/create', store);
router.get('/deport', validateJWT, tipsters_by_deport);

module.exports = router;

