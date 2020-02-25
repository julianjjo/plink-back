var jwt = require('jsonwebtoken');
const secretKey = require(__dirname + '/../key.js');

module.exports.verify = (token) =>{
  try {
    var decoded = jwt.verify(token, secretKey.tokenKey);
  } catch(err) {
    return false;
  }
  return true;
}

module.exports.sign = (data) =>{
  var token = jwt.sign(data, secretKey.tokenKey);
  return token;
}
