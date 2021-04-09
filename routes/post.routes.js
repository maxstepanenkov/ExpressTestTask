const Router = require('express');
const router = new Router();
const authMiddleware = require('../middleware/auth.middleware');
const postController = require('../controllers/post.controller');

router.post('', authMiddleware(['ADMIN', 'USER']), postController.create);
router.get('', authMiddleware(['ADMIN', 'USER']), postController.getAll);
router.put('', authMiddleware(['ADMIN', 'USER']), postController.updateById);
router.delete('', authMiddleware(['ADMIN', 'USER']), postController.removeById);

module.exports = router;
