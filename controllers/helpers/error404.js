const error404 = (ctx) => {
  ctx.status = 404;
  ctx.body = {
    status: 'error',
    message: '404 Not Found'
  };
}

module.exports = error404;