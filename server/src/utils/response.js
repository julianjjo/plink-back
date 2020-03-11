class Response {

    constructor(response) {
        this.response = response;
    }

    responseErrorSequelizeSave(error) {
        this.response.statusCode = 400;
        this.response.json({
            "type": error.parent.code,
            "title": error.parent.sqlMessage,
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
        this.response.send('Unauthorized token invalid');
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

    responseNotImplemented(){
        this.response.statusCode = 501;
        this.response.json({
            "type": 'Not Implemented',
            "status": 501
        });
    }
}

export default Response