'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;
  const UserMenu = app.model.define(
    'user_menu', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      url: STRING,
      component: STRING,
      redirect: STRING,
      title: STRING,
      icon: STRING,
      pid: INTEGER,
      sort: INTEGER,
      uauth_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    }, {
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  UserMenu.associate = function() {
    UserMenu.belongsTo(app.model.UserAuth, {
      foreignKey: 'uauth_id',
      targetKey: 'id',
    });
  };

  return UserMenu;
};
