const { Producto } = require('../models');
const error404 = require('./helpers/error404');

const getAll = async (ctx) => {
  ctx.body = await Producto.findAll();
};

const getById = async (ctx) => {
  const id = ctx.params.id;
  const producto = await Producto.findByPk(id);
  if (!producto) return error404(ctx);
  ctx.body = producto;
};

const create = async (ctx) => {
  const { nombre } = ctx.request.body;
  const producto = await Producto.create({ nombre });
  ctx.body = producto;
};

const update = async (ctx) => {
  const id = ctx.params.id;
  const { nombre } = ctx.request.body;
  const producto = await Producto.findByPk(id);
  if (!producto) return error404(ctx);
  await producto.update({ nombre });
  ctx.body = producto;
};

const destroy = async (ctx) => {
  const id = ctx.params.id;
  const producto = await Producto.findByPk(id);
  if (!producto) return error404(ctx);
  await producto.destroy();
  ctx.status = 204;
};

module.exports = { getAll, getById, create, update, destroy };