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
    return jwt.sign(data, secretKey.tokenKey,{ expiresIn: '1h' });
  }

  getToken(request) {
    let token = request.headers.authorization;
    if (token !== undefined) {
      token = token.substr(6);
    }
    return token;
  }

  decode(token) {
    return jwt.decode(token);
  }
}

export default Auth;
