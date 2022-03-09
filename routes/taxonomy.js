const {Router} = require('express');
const router = Router();
const {getTaxonomy, createTaxonomy} = require('../controllers/taxonomy');

router.post('/create', createTaxonomy);
router.get('/get-taxonomy/:slug', getTaxonomy);

module.exports = router;

