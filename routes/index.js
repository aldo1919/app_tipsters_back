const { Router } = require('express')
const router = Router()

router.use( '/login', require('./auth') );
router.use( '/tipster', require('./tipster') );

module.exports = router