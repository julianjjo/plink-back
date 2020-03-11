module.exports = (sequelize, DataTypes) => {
  let Cryptocurrency = sequelize.define('Cryptocurrency', {
    price: DataTypes.INTEGER,
    name: DataTypes.STRING,
    source: DataTypes.STRING
  });

  Cryptocurrency.associate = function (models) {
    Cryptocurrency.belongsTo(models.User, {
      as: 'User'
    });
  };
   return Cryptocurrency;
};
