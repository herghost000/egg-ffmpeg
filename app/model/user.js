'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(30),
    age: INTEGER,
    created_at: DATE,
    updated_at: DATE,
  });

  User.associate = function() {
    User.belongsToMany(app.model.UserRole, {
      through: 'user_role_ref',
    });
    User.belongsToMany(app.model.UserGroup, {
      through: 'user_group_ref',
    });
  };

  return User;
};
