class Response {

    constructor(response) {
        this.response = response;
    }

    responseErrorSequelizeSave(error) {
        this.response.statusCode = 400;

        this.response.json({
            "type": error.code,
            "message": error.message,
            "status": 400
        });
    }

    responseNotFound(message) {
        this.response.statusCode = 404;
        this.response.json({
            "type": 'Not Found',
            "message": message,
            "status": 404
        });
    }

    responseErrorTokenInvalid() {
        this.response.statusCode = 401;
        this.response.json({
            "message": "Unauthorized token invalid",
            "status": 401
        });
    }

    responseOkMessage(message = 'Created'){
        this.response.statusCode = 201;
        this.response.json({
            "message": message,
            "status": 200
        });
    }

    responseJson(json){
        this.response.statusCode = 200;
        this.response.json(json);
    }

    responseNotImplemented() {
        this.response.statusCode = 501;
        this.response.json({
            "type": 'Not Implemented',
            "status": 501
        });
    }

    responseToken(token) {
        this.response.statusCode = 200;
        this.response.json({
            message: 'Authenticated',
            token: token
        });
    }

    responsePasswordInvalid() {
        this.response.statusCode = 401;
        this.response.json({
            "message": "Password invalid",
            "status": 401
        });
    }
}

export default Response
