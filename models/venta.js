'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Venta.belongsToMany(models.Producto, {
        through: models.VentaProducto,
        foreignKey: 'ventaId',
        otherKey: 'productoId',
        as: 'productos'
      });
      Venta.hasMany(models.VentaProducto, {
        foreignKey: 'ventaId',
        as: 'detalleProductos'
      });
    }

    async addProductos(productos) {
      const VentaProducto = sequelize.models.VentaProducto;
      const ventaProductos = productos.map(producto => ({
        ventaId: this.id,
        productoId: producto.productoId,
        cantidad: producto.cantidad,
        precio: producto.precio
      }));
      await VentaProducto.bulkCreate(ventaProductos);
    }
  }
  Venta.init({
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date()
    },
  }, {
    sequelize,
    modelName: 'Venta',
  });
  return Venta;
};