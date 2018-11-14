'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {
      INTEGER,
      STRING,
      DATE,
    } = Sequelize;
    return queryInterface.createTable('video_lists', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING,
      type_id: Sequelize.INTEGER,
      // type_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'video_types',
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },
      surface_plot: STRING,
      video_url: STRING,
      decode_id: Sequelize.INTEGER,
      // decode_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'video_decodes',
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },
      dsc: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('video_lists');
  },
};
