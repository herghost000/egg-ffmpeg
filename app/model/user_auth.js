'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UserAuth = app.model.define(
    'user_auth',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      created_at: DATE,
      updated_at: DATE,
    },
    {
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  UserAuth.associate = function() {
    UserAuth.belongsToMany(app.model.UserMenu, {
      through: 'user_auth_menu',
    });
    UserAuth.belongsToMany(app.model.UserRole, {
      through: 'user_role_auth',
    });
  };

  return UserAuth;
};
