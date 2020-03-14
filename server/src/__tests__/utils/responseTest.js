import Response from '../../utils/response';

describe("Response Utils", function() {

    function createResMock(){
        let res = {};
        res.statusCode = "";
        res.json = jest.fn().mockName('json');
        res.send = jest.fn().mockName('send');
        return res;
    }

    function createErrorMock(){
        let error = {};
        error.parent = {};
        error.parent.code = "validation error";
        error.parent.sqlMessage = "query error";
        return error;
    }

    test('have Called responseErrorSequelizeSave', () => {
        let res = createResMock();
        let error = createErrorMock();
        let response = new Response(res);
        response.responseErrorSequelizeSave(error);
        expect(res.json).toHaveBeenCalled();
    });

    test('have Called responseNotFound', () => {
        let res = createResMock();
        let response = new Response(res);
        response.responseNotFound("Not Found");
        expect(res.json).toHaveBeenCalled();
    });

    test('have Called responseErrorTokenInvalid', () => {
        let res = createResMock();
        let response = new Response(res);
        response.responseErrorTokenInvalid();
        expect(res.json).toHaveBeenCalled();
    });

    test('have Called responseOkMessage', () => {
        let res = createResMock();
        let response = new Response(res);
        response.responseOkMessage("Created");
        expect(res.json).toHaveBeenCalled();
    });

    test('have Called responseJson', () => {
        let res = createResMock();
        let response = new Response(res);
        let json = {};
        response.responseJson(json);
        expect(res.json).toHaveBeenCalled();
    });

    test('have Called responseNotImplemented', () => {
        let res = createResMock();
        let response = new Response(res);
        response.responseNotImplemented();
        expect(res.json).toHaveBeenCalled();
    });

    test('have Called responseToken', () => {
        let res = createResMock();
        let response = new Response(res);
        response.responseToken("eyJhbGciOiJIUzI1NiIsIn");
        expect(res.json).toHaveBeenCalled();
    });

    test('have Called responsePasswordInvalid', () => {
        let res = createResMock();
        let response = new Response(res);
        response.responsePasswordInvalid();
        expect(res.json).toHaveBeenCalled();
    });
});
