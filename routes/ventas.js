const Router = require("koa-router");
const ventasController = require('../controllers/ventas');

const router = new Router();

router.get('/ventas', ventasController.getAll);
router.get('/ventas/:id', ventasController.getById);
router.post('/ventas', ventasController.create);
router.put('/ventas/:id', ventasController.update);
router.delete('/ventas/:id', ventasController.destroy);

module.exports = router;
