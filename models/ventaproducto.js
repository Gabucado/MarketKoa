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
      });
      VentaProducto.belongsTo(models.Producto, {
        foreignKey: 'id',
        as: 'producto',
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
  return VentaProducto;
};