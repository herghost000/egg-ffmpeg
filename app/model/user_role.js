'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UserRole = app.model.define(
    'user_role',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30), // 角色名
      created_at: DATE,
      updated_at: DATE,
    },
    {
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  UserRole.associate = function() {
    UserRole.belongsToMany(app.model.UserAuth, {
      through: 'user_role_auth',
    });
    UserRole.belongsToMany(app.model.User, {
      through: 'user_role_ref',
    });
    UserRole.belongsToMany(app.model.UserGroup, {
      through: 'user_group_role_ref',
    });
  };

  return UserRole;
};
