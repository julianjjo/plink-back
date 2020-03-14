import unirest from 'unirest';
import BraveNewCoin from "../../wapper/braveNewCoin";

jest.mock('unirest');

describe("Wrapper braveNewCoinsTest", function() {

    test('have Called get', () => {
        let valuesReturn = getReturnMock();
        let req = getRequestMock(valuesReturn);
        let unirest = jest.fn();
        unirest.mockReturnValue(req);
        let braveNewCoin = new BraveNewCoin(unirest);
        braveNewCoin.get({
                "show": "usd",
                "coin": "btc"
            }, jest.fn());
        expect(req.end).toHaveBeenCalled();
    });

    function getRequestMock(valuesReturn) {
        let req = {};
        req.query = jest.fn();
        req.headers = jest.fn();
        req.end = jest.fn().mockImplementation(() => valuesReturn);
        return req;
    }

    function getReturnMock() {
        return {
            "source":"BraveNewCoin",
            "coin_id":"LTC",
            "success":true,
            "currency":"USD",
            "utc_date":"2018-09-10 01:06:01",
            "coin_name":"Litecoin",
            "last_price":"55.04515558",
            "time_stamp":"1536541561",
            "volume_24hr":"282621007",
            "currency_name":"United States Dollar",
            "vol_24hr_pcnt":"9.17",
            "price_24hr_pcnt":"4.05"
        }
    }
});
