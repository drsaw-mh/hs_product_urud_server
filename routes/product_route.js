const router = require('express').Router();
const controller = require('../controllers/product_controller');

router.get('/', [controller.get]);
router.post('/create', [controller.create]);
router.patch('/:id', [controller.update]);
router.delete('/:id', [controller.drop]);



module.exports = router;