module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Cryptocurrency', {
    price: DataTypes.INTEGER,
    name: DataTypes.STRING,
    source: DataTypes.STRING
  });
};
