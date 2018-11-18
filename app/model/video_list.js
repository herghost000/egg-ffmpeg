'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const VideoList = app.model.define(
    'video_list',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING,
      type_id: INTEGER,
      surface_plot: STRING,
      video_url: STRING,
      video_path: STRING,
      decode_id: INTEGER,
      dsc: STRING,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      deletedAt: 'deleted_at',
      paranoid: true,
      indexes: [
        {
          fields: [ 'type_id' ],
        },
        {
          fields: [ 'decode_id' ],
        },
      ],
    }
  );

  VideoList.associate = function() {
    VideoList.belongsTo(app.model.VideoType, {
      foreignKey: 'type_id',
      targetKey: 'id',
    });
    VideoList.belongsTo(app.model.VideoDecode, {
      foreignKey: 'decode_id',
      targetKey: 'id',
    });
  };

  return VideoList;
};
