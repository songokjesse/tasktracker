module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    Name: DataTypes.STRING,
  }, {});
  // eslint-disable-next-line no-unused-vars
  Role.associate = (models) => {
    // associations can be defined here
  };
  return Role;
};
