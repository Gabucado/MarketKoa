const Koa = require('koa');
const parser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router.js');

const App = new Koa();
const port = 3000;

App.use(parser());
App.use(cors());
App.use(router.routes());
App.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});