const Router = require("koa-router");
const productosRouter = require('./routes/productos.js');
const ventasRouter = require('./routes/ventas.js');
const inventariosRouter = require('./routes/inventarios.js');

const router = new Router();

router.use(productosRouter.routes());
router.use(ventasRouter.routes());
router.use(inventariosRouter.routes());

module.exports = router;