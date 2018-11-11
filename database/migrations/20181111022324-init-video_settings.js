'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    const {
      INTEGER,
      STRING,
      DATE,
      BOOLEAN,
    } = Sequelize;
    return queryInterface.createTable('video_settings', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      host: STRING(30),
      ratio: STRING,
      miaoqie: STRING,
      antiwhite: STRING,
      antiurl: STRING,
      antikey: STRING,
      screenshots: INTEGER,
      tsencry: BOOLEAN,
      openapi: BOOLEAN,
      watermark: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.dropTable('video_settings');
  },
};
