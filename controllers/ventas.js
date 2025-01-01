const { Venta } = require('../models');
const error404 = require('./helpers/error404');

const getAll = async (ctx) => {
  ctx.body = await Venta.findAll();
};

const getById = async (ctx) => {
  const id = ctx.params.id;
  const venta = await Venta.findByPk(id, { include: ['productos'] });
  if (!venta) return error404(ctx);
  ctx.body = venta;
};

const create = async (ctx) => {
  // se supone que el cliente envía un arreglo de tuplas con el id del producto y la cantidad
  const { compras } = ctx.request.body;
  const venta = await Venta.create({ fecha: new Date() });
  await venta.addProductos(compras);

  // const { productos } = ctx.request.body;
  // const venta = await Venta.create();
  // await venta.addProductos(productos);
  // ctx.body = venta;
};

const update = async (ctx) => { };

const destroy = async (ctx) => {
  const id = ctx.params.id;
  const venta = await Venta.findByPk(id);
  if (!venta) return error404(ctx);
  await venta.destroy();
  ctx.status = 204;
};

module.exports = { getAll, getById, create, update, destroy };