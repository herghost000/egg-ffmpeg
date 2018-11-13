'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable('user_infos', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user_infos');
  },
};
