const { nombresDeCompletos } = require('./nombresDeCompletos');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Por cada periodo de mes en 6 meses, crear por lo menos 5 registros de Venta, Inventario.
    //   - Crear 5 ventas
    //   - Crear 5 inventarios
    // ✅ No es necesario crear mas productos, se pueden crear de ante mano.
    const updatedAt = new Date();
    const createdAt = updatedAt;

    const cantidadDeEntradasPorPeriodo = 10;
    const cantidadDePeriodos = 6;

    // Productos
    await queryInterface.bulkInsert(
      'Productos',
      nombresDeCompletos.map(
        (nombre) => ({ nombre, createdAt, updatedAt })), {});


    const productos = await queryInterface.sequelize.query(
      `SELECT id FROM "Productos" WHERE nombre IN (${nombresDeCompletos.map(nombre => `'${nombre}'`).join(', ')})`,
      { type: Sequelize.QueryTypes.SELECT }
    );

    const productoIds = productos.map(producto => producto.id);

    // Ventas
    var baseDate = new Date();
    baseDate.setMonth(baseDate.getMonth() - cantidadDePeriodos);
    var getRandomDay = () => Math.floor(Math.random() * 4 + 1);

    for (let month = 0; month < cantidadDePeriodos; month++) {
      var temp = new Date(baseDate);
      var baseMonth = new Date(temp.setMonth(temp.getMonth() + month));

      const ventas = Array.from({ length: cantidadDeEntradasPorPeriodo }, () => ({
        fecha: new Date(baseMonth.setDate(baseMonth.getDate() + getRandomDay())),
        createdAt,
        updatedAt
      }));

      temp = new Date(baseDate);
      baseMonth = new Date(temp.setMonth(temp.getMonth() + month));

      await queryInterface.bulkInsert('Venta', ventas, {});

      const ventasInsertadas = await queryInterface.sequelize.query(
        `SELECT id FROM "Venta" WHERE fecha >= '${baseMonth.toISOString().split('T')[0]}' AND fecha <= '${new Date(baseMonth.setMonth(baseMonth.getMonth() + 1)).toISOString().split('T')[0]}'`,
        { type: Sequelize.QueryTypes.SELECT }
      );


      const ventaIds = ventasInsertadas.map(venta => venta.id);
      console.log(ventaIds);

      // Inventario inicial
      await queryInterface.bulkInsert(
        'Inventarios',
        productoIds.map(productoId => ({ productoId, cantidad: 100, fecha: baseDate, createdAt, updatedAt })),
      );

      for (let ventaId of ventaIds) {
        for (let productoId of productoIds) {
          const cantidad = Math.floor(Math.random() * 10 + 1);
          const precio = Math.floor(Math.random() * 1000 + 100);

          const lastInventario = await queryInterface.sequelize.query(
            `SELECT cantidad FROM "Inventarios" WHERE "productoId" = ${productoId} ORDER BY fecha DESC LIMIT 1`,
            { type: Sequelize.QueryTypes.SELECT }
          );

          const venta = await queryInterface.sequelize.query(
            `SELECT * FROM "Venta" WHERE id = ${ventaId}`,
            { type: Sequelize.QueryTypes.SELECT }
          );

          const lastCantidad = lastInventario.length > 0 ? lastInventario[0].cantidad : 0;
          const newCantidad = lastCantidad > cantidad ? lastCantidad - cantidad : 0;

          // Crear nuevo inventario
          await queryInterface.bulkInsert('Inventarios', [{
            productoId,
            fecha: new Date(venta[0].fecha),
            cantidad: newCantidad,
            createdAt,
            updatedAt
          }], {});

          await queryInterface.bulkInsert('VentaProductos',
            [{
              ventaId, productoId, cantidad: newCantidad, precio, createdAt, updatedAt
            }], {});
        }

      };
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {});
    await queryInterface.bulkDelete('Venta', null, {});
    await queryInterface.bulkDelete('Inventarios', null, {});
    await queryInterface.bulkDelete('VentaProductos', null, {});
  }
};