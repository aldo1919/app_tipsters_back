const { Router } = require('express')
const router = Router()

router.use( '/login', require('./auth') );
router.use( '/tipster', require('./tipster') );
router.use( '/taxonomy', require('./taxonomy') );

module.exports = router
