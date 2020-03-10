import Auth from '../../utils/auth';
describe("Authentication", function() {
    describe("verify token", function() {
        let token, auth;

        beforeEach(() => {
            this.auth =  new Auth();
        });

        test('is false', () => {
            expect(this.auth.verify('test')).toBeFalsy();
        });

        beforeEach(() => {
            token = this.auth.sign({ user: 'julian', password: 'ndjnejnejnje' });
        });

        test('is true', () => {
            expect(this.auth.verify(token)).toBeTruthy();
        });
    })

    describe("get token", function() {
        let auth;


        beforeEach(() => {
             this.auth =  new Auth();
        });

        test('is 3df5dc', () => {
            const mockRequest = () => {
                const req = {};
                req.headers = {};
                req.headers.authorization = "token 3df5dc";
                return req;
            };
            let req = mockRequest();
            expect(this.auth.getToken(req)).toBe("3df5dc");
        });
    })

})