'use stric';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      DataTypes.STRING,
      unique: true
    }
  });

  return User;
};
