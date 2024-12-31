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
        foreignKey: 'id',
        as: 'detalleProductos'
      });

    }
  }
  Venta.init({
    fecha: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Venta',
  });
  return Venta;
};