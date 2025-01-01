const Router = require("koa-router");
const inventariosController = require('../controllers/inventarios');

const router = new Router();

router.get('/inventarios', inventariosController.getAll);
router.get('/inventarios/:id', inventariosController.getById);
router.post('/inventarios', inventariosController.create);
router.put('/inventarios/:id', inventariosController.update);
router.delete('/inventarios/:id', inventariosController.destroy);

module.exports = router;
