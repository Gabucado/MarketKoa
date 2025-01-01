const { Inventario } = require('../models');
const error404 = require('./helpers/error404.js');

const getAll = async (ctx) => {
  ctx.body = await Inventario.findAll();
};

const getById = async (ctx) => {
  const id = ctx.params.id;
  const inventario = await Inventario.findByPk(id, { include: ['producto'] });
  if (!inventario) return error404(ctx);
  ctx.body = inventario;
};

const create = async (ctx) => {
  const { productoId, cantidad } = ctx.request.body;
  const inventario = await Inventario.create({ productoId, cantidad });
  ctx.body = inventario;
};

const update = async (ctx) => {
  const id = ctx.params.id;
  const { cantidad } = ctx.request.body;
  const inventario = await Inventario.findByPk(id);
  if (!inventario) return error404(ctx);
  await inventario.update({ cantidad });
  ctx.body = inventario;
};

const destroy = async (ctx) => {
  const id = ctx.params.id;
  const inventario = await Inventario.findByPk(id);
  if (!inventario) return error404(ctx);
  await inventario.destroy();
  ctx.status = 204;
};

module.exports = { getAll, getById, create, update, destroy };