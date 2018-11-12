'use strict';

module.exports = app => {
  const {
    INTEGER,
    STRING,
    DATE,
  } = app.Sequelize;

  const Setting = app.model.define('video_type', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING,
    created_at: DATE,
    updated_at: DATE,
  });

  return Setting;
};
