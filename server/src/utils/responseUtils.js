class ResponseUtils {

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

    responseErrorTokenInvalid() {
        this.response.statusCode = 401;
        this.response.send('Unauthorized token invalid');
    }

    responseCreated(message = 'Created'){
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
}

export default ResponseUtils