import Auth from '../../utils/auth';

describe("Authentication", function() {
    describe("verify token", function() {
        let token, auth;

        beforeEach(() => {
            auth = new Auth();
        });

        test('is false', () => {
            expect(auth.verify('test')).toBeFalsy();
        });

        beforeEach(() => {
            token = auth.sign({user: 'julian', password: 'ndjnejnejnje'});
        });

        test('is true', () => {
            expect(auth.verify(token)).toBeTruthy();
        });
    });

    describe("get token", function() {
        let auth;


        beforeEach(() => {
            auth = new Auth();
        });

        test('is 3df5dc', () => {
            const mockRequest = () => {
                const req = {};
                req.headers = {};
                req.headers.authorization = "token 3df5dc";
                return req;
            };
            let req = mockRequest();
            expect(auth.getToken(req)).toBe("3df5dc");
        });
    });

    describe("decode token", function () {
        let auth;


        beforeEach(() => {
            auth = new Auth();
        });

        test('is true', () => {
            let token = auth.sign({user: 'julian', password: 'ndjnejnejnje'});
            expect(auth.decode(token)).toMatchObject({user: 'julian', password: 'ndjnejnejnje'});
        });
    })

});