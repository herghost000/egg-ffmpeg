'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE } = Sequelize;
    return queryInterface.createTable('video_lists', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING,
      type_id: Sequelize.INTEGER,
      surface_plot: STRING,
      video_url: STRING,
      video_path: STRING,
      decode_id: Sequelize.INTEGER,
      dsc: STRING,
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('video_lists');
  },
};
