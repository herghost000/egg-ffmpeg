'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      DATE,
    } = Sequelize;
    return queryInterface.createTable('video_decode_status', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING,
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('video_decode_status');
  },
};
