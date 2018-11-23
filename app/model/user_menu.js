'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;
  const UserMenu = app.model.define('user_menu', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30), // 菜单名
    url: STRING, // 菜单url
    pid: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  }, {
    deletedAt: 'deleted_at',
    paranoid: true,
  });

  UserMenu.associate = function() {
    UserMenu.belongsToMany(app.model.UserAuth, {
      through: 'user_auth_menu',
    });
  };

  return UserMenu;
};
