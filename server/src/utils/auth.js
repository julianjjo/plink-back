import jwt from 'jsonwebtoken';
import secretKey from '../../key';

class Auth {
  constructor() {
  }

  verify(token){
    try {
      jwt.verify(token, secretKey.tokenKey);
    } catch(err) {
      return false;
    }
    return true;
  }

  sign (data){
    let token = jwt.sign(data, secretKey.tokenKey);
    return token;
  }

  getToken(request){
    let token = request.headers.authorization;
    token = token.substr(6);
    return token;
  }
}

export default Auth;