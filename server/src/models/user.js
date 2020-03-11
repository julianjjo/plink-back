module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        max: {
          args: 8,
          msg: "Maximum 9 characteres allowed in password",
        }
      }
    },
    preferred_currency: DataTypes.ENUM('usd', 'eur', 'cop')
  });

  User.associate = function (models) {
    User.hasMany(models.Cryptocurrency, {
      as: 'Cryptocurrencies'
    });
  };

  return User;
};
