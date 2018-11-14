'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;
  console.log(66666666666666666, this);
  const VideoList = app.model.define('video_list', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    // type_id: INTEGER,
    type_id: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'video_types',
        key: 'id',
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
  }, {
    indexes: [{
      fields: [ 'type_id' ],
    }],
  });
  // VideoList.belongsTo(/* app.model.VideoType*/ 'VideoType', {
  //   foreignKey: 'type_id',
  //   targetKey: 'id',
  //   as: 'Type',
  // });
  VideoList.associate = function() {
    VideoList.belongsTo(app.model.VideoType, {
      foreignKey: 'type_id',
      targetKey: 'id',
    });
  };

  return VideoList;
};
