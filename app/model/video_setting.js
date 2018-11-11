'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
    BOOLEAN,
  } = app.Sequelize;

  const Setting = app.model.define('video_setting', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    host: STRING(30),
    ratio: STRING,
    miaoqie: STRING,
    antiwhite: STRING,
    antiurl: STRING,
    antikey: STRING,
    screenshots: INTEGER,
    tsencry: BOOLEAN,
    openapi: BOOLEAN,
    watermark: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Setting;
};
