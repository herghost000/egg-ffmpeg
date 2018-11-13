'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const Setting = app.model.define('video_list', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    type_id: INTEGER,
    surface_plot: STRING,
    video_url: STRING,
    decode_id: INTEGER,
    dsc: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Setting;
};
