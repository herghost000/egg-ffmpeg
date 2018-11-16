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
      url: STRING,
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
    VideoDecode.hasMany(app.model.VideoList, {
      foreignKey: 'type_id',
      sourceKey: 'id',
    });
    VideoDecode.belongsTo(app.model.VideoDecodeStatus, {
      foreignKey: 'status_id',
      targetKey: 'id',
    });
  };

  return VideoDecode;
};
