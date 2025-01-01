'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VentaProducto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      VentaProducto.belongsTo(models.Venta, {
        foreignKey: 'id',
        as: 'venta',
        onDelete: 'CASCADE',
      });
      VentaProducto.belongsTo(models.Producto, {
        foreignKey: 'id',
        as: 'producto',
        onDelete: 'CASCADE',
      });
    }
  }
  VentaProducto.init({
    ventaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Venta',
        key: 'id',
      },
    },
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'VentaProducto',
  });

  VentaProducto.addHook('beforeCreate', async (ventaProducto, options) => {
    const { Inventario } = sequelize.models;
    const lastInventario = await Inventario.findOne({
      where: { productoId: ventaProducto.productoId },
      order: [['fecha', 'DESC']],
    });

    const quantity = lastInventario.cantidad > ventaProducto.cantidad ? ventaProducto.cantidad : lastInventario.cantidad;

    await Inventario.create({
      productoId: ventaProducto.productoId,
      cantidad: lastInventario.cantidad - quantity,
      fecha: new Date(),
    });
  })
  return VentaProducto;
};