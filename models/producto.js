'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsToMany(models.Venta, {
        through: models.VentaProducto,
        foreignKey: 'productoId',
        otherKey: 'ventaId',
        as: 'ventas',
      });

      Producto.hasMany(models.Inventario, {
        foreignKey: 'productoId',
        as: 'inventarios'
      });

      Producto.hasMany(models.VentaProducto, {
        foreignKey: 'productoId',
        as: 'detalleVentas'
      });
    }
  }
  Producto.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Producto',
  });
  return Producto;
};