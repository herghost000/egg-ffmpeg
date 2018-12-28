'use strict';

module.exports = app => {
  app.model.sync({
    alter: true,
  });
};
