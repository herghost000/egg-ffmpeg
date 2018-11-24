'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const UserGroup = app.model.define(
    'user_group',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30), // 用户组名
      pid: INTEGER, // 父用户组
      created_at: DATE,
      updated_at: DATE,
    },
    {
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  UserGroup.associate = function() {
    UserGroup.belongsToMany(app.model.User, {
      through: 'user_group_ref',
    });
    UserGroup.belongsToMany(app.model.UserRole, {
      through: 'user_group_role_ref',
    });
  };

  return UserGroup;
};
