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
      type_id: {
        // name of the key we're adding
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'video_lists', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      surface_plot: STRING,
      video_url: STRING,
      decode_id: INTEGER,
      dsc: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('video_lists');
  },
};
