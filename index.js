const Koa = require('koa');
const parser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router.js');


const App = new Koa();
const port = 3000;

// Middlewares
App.use(parser());
App.use(cors());
App.use(router.allowedMethods());
App.use(router.routes());

App.use(async (ctx) => {
  ctx.body = {
    message: 'Available resources',
    resources: [
      { ventas: '/ventas' },
      { inventarios: '/inventarios' },
      { productos: '/productos' },
    ]
  };
});


App.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});