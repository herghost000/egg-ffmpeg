'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE } = app.Sequelize;

  const VideoDecodeStatus = app.model.define('video_decode_statu', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  VideoDecodeStatus.associate = function() {
    VideoDecodeStatus.hasMany(app.model.VideoDecode, {
      foreignKey: 'status_id',
      sourceKey: 'id',
    });
  };

  return VideoDecodeStatus;
};
