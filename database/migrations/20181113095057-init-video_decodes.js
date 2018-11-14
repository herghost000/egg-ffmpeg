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
      status_id: Sequelize.INTEGER,
      // status_id: {
      //   type: Sequelize.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: 'video_decode_status',
      //     key: 'id',
      //   },
      //   onUpdate: 'CASCADE',
      //   onDelete: 'CASCADE',
      // },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('video_decodes');
  },
};
