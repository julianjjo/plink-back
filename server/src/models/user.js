module.exports = (sequelize, DataTypes) => {
  let User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
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
