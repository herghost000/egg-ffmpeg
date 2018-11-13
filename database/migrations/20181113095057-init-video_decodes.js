'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      DATE,
    } = Sequelize;
    return queryInterface.createTable('video_decodes', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      url: STRING,
      status_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('video_decodes');
  },
};
