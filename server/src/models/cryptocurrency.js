module.exports = (sequelize, DataTypes) => {
  var Crytocurrency = sequelize.define('Crytocurrency', {
    price: DataTypes.INTEGER,
    name: DataTypes.STRING,
    source: DataTypes.STRING
  });
  return Crytocurrency;
};
