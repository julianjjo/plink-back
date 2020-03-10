import Auth from '../../utils/auth';

describe("Authentication verify token", function() {
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