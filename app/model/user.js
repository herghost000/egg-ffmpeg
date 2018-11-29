'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define(
    'user',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: STRING(30),
      pass: STRING(30),
      avatar: STRING,
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    },
    {
      deletedAt: 'deleted_at',
      paranoid: true,
    }
  );

  User.associate = function() {
    User.belongsToMany(app.model.UserRole, {
      through: 'user_role_refs',
    });
    User.belongsToMany(app.model.UserGroup, {
      through: 'user_group_refs',
    });
    User.belongsToMany(app.model.UserAuth, {
      through: 'user_auth_refs',
    });
  };

  return User;
};
