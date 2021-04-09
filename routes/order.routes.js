const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const orderController = require('../controllers/order.controller');
const order = require('../models/order');

router.post('', authMiddleware(['ADMIN', 'USER']), orderController.create);
router.get('', authMiddleware(['ADMIN', 'USER']), orderController.getAll);
router.put('', authMiddleware(['ADMIN', 'USER']), orderController.updateById);
router.delete('', authMiddleware(['ADMIN', 'USER']), orderController.removeById);

module.exports = router;
