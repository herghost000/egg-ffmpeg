'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const VideoDecode = app.model.define(
    'video_decode', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      trans_path: STRING,
      chunk_path: STRING,
      thumb_path: STRING,
      status_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    }, {
      deletedAt: 'deleted_at',
      paranoid: true,
      indexes: [{
        fields: [ 'status_id' ],
      }],
    }
  );

  VideoDecode.associate = function() {
    VideoDecode.hasOne(app.model.VideoList, {
      foreignKey: 'decode_id',
      sourceKey: 'id',
    });
    VideoDecode.belongsTo(app.model.VideoDecodeStatus, {
      foreignKey: 'status_id',
      targetKey: 'id',
    });
  };

  return VideoDecode;
};
