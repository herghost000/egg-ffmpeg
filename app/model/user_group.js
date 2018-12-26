'use strict';

module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
  } = app.Sequelize;
  const UserGroup = app.model.define(
    'user_group', {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      pid: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    }, {
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  UserGroup.associate = function() {
    UserGroup.belongsToMany(app.model.User, {
      through: 'user_group_refs',
    });
    UserGroup.belongsToMany(app.model.UserRole, {
      through: 'user_group_role_refs',
    });
  };

  return UserGroup;
};
