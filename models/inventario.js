'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Inventario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Inventario.belongsTo(models.Producto, {
        foreignKey: 'productoId',
        as: 'producto',
        onDelete: 'CASCADE'
      });
    }
  }
  Inventario.init({
    productoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Producto',
        key: 'id'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: () => new Date()
    },
    cantidad: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Inventario',
  });
  return Inventario;
};