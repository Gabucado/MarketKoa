const Router = require("koa-router");
const productosController = require('../controllers/productos');


const router = new Router();

router.get('/productos', productosController.getAll);
router.get('/productos/:id', productosController.getById);
router.post('/productos', productosController.create);
router.put('/productos/:id', productosController.update);
router.delete('/productos/:id', productosController.destroy);

module.exports = router;