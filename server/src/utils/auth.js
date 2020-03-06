import jwt from 'jsonwebtoken';
import secretKey from '../../key';

export function verify(token){
  try {
    jwt.verify(token, secretKey.tokenKey);
  } catch(err) {
    return false;
  }
  return true;
}

export function sign (data){
  var token = jwt.sign(data, secretKey.tokenKey);
  return token;
}
