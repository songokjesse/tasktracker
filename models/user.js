module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: DataTypes.STRING,
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    models.User.hasMany(models.Task);
  };
  return User;
};
