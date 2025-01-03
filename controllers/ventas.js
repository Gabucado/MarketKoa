const { Venta, VentaProducto } = require('../models');
const error404 = require('./helpers/error404');

const getAll = async (ctx) => {
  ctx.body = await Venta.findAll({ include: ['detalleProductos'] });
};

const getById = async (ctx) => {
  const id = ctx.params.id;
  const venta = await Venta.findByPk(id, { include: ['detalleProductos'] });
  if (!venta) return error404(ctx);
  ctx.body = venta;
};

const create = async (ctx) => {
  const { compras } = ctx.request.body;
  const venta = await Venta.create({ fecha: new Date() });
  await venta.addProductos(compras);
  const ventaTotal = await Venta.findByPk(venta.id, { include: ['detalleProductos'] });
  ctx.body = ventaTotal;
};

const update = async (ctx) => {
  const id = ctx.params.id;
  const { fecha, ventaProducto } = ctx.request.body; // Destructure properties from request body
  const venta = await Venta.findByPk(id);
  if (!venta) return error404(ctx);
  await venta.update({ fecha });

  if (ventaProducto) {
    const ventaProductoRecord = await VentaProducto.findByPk(ventaProducto.id);
    if (ventaProductoRecord) {
      await ventaProductoRecord.update(ventaProducto);
    }
  }
  ctx.body = { venta, ventaProducto };
};

const destroy = async (ctx) => {
  const id = ctx.params.id;
  const venta = await Venta.findByPk(id);
  if (!venta) return error404(ctx);
  await venta.destroy();
  ctx.status = 204;
};

module.exports = { getAll, getById, create, update, destroy };