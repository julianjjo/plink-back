import db from '../../models/index';
import CrytocurrencyService from '../../services/cryptocurrencyService';

jest.mock('../../models/index');

describe("Cryptocurrency Service", function() {

    beforeEach(() => {
        this.data = {
            price: 300,
            name: "Bitcoin",
            source: "testing"
        };
        this.userDataMock = {};
        this.userDataMock.id = 1;
    });

    test('should fetch cryptocurrencies', () => {
        this.data = [
            this.data
        ];
        db.sequelize.models.Cryptocurrency.findAll.mockResolvedValue(this.data);
        let Cryptocurrency = new CrytocurrencyService(db, this.userDataMock);
        return Cryptocurrency.getAll().then(data => expect(data).toEqual(this.data));
    });

    test('should trow error in getAll', async () => {
        db.sequelize.models.Cryptocurrency.findAll.mockRejectedValue(new Error("Dont Find Table Error"));
        let Cryptocurrency = new CrytocurrencyService(db, this.userDataMock);
        return await Cryptocurrency.getAll().catch(e =>
            expect(e).toEqual(new Error("Dont Find Table Error")),
        );
    });

    test('have Called create in set', () => {
        db.sequelize.models.Cryptocurrency.create = jest.fn().mockName('create');
        let Cryptocurrency = new CrytocurrencyService(db);
        Cryptocurrency.set(this.data);
        expect(db.sequelize.models.Cryptocurrency.create).toHaveBeenCalled();
    });

    test('should trow error in set', async () => {
        db.sequelize.models.Cryptocurrency.create.mockRejectedValue(new Error("Duplicate entry '' for key 'users.username'"));
        let Cryptocurrency = new CrytocurrencyService(db);
        return await Cryptocurrency.set().catch(e =>
            expect(e).toEqual(new Error("Duplicate entry '' for key 'users.username'")),
        );
    });


    test('should fetch cryptocurrency', () => {
        db.sequelize.models.Cryptocurrency.findOne.mockResolvedValue(this.data);
        let Cryptocurrency = new CrytocurrencyService(db);
        return Cryptocurrency.get().then(data => expect(data).toEqual(this.data));
    });

    test('should fetch Cryptocurrency not found in get', () => {
        this.data = undefined;
        db.sequelize.models.Cryptocurrency.findOne.mockResolvedValue(this.data);
        let Cryptocurrency = new CrytocurrencyService(db);
        return Cryptocurrency.get().then(data => expect(data).toEqual("CryptoCurrency not found"));
    });

    test('should trow error in get', async () => {
        db.sequelize.models.Cryptocurrency.findOne.mockRejectedValue(new Error("Duplicate entry '' for key 'users.username'"));
        let Cryptocurrency = new CrytocurrencyService(db);
        return await Cryptocurrency.get().catch(e =>
            expect(e).toEqual(new Error("Duplicate entry '' for key 'users.username'")),
        );
    });

    test('have Called destroy in delete', () => {
        let idCriptocurrency = 1;
        db.sequelize.models.Cryptocurrency.destroy = jest.fn().mockName('destroy').mockReturnValueOnce(Promise.resolve());
        let Cryptocurrency = new CrytocurrencyService(db);
        Cryptocurrency.delete(idCriptocurrency);
        expect(db.sequelize.models.Cryptocurrency.destroy).toHaveBeenCalled();
    });

    test('should trow error in delete', async () => {
        let idCriptocurrency = 10;
        db.sequelize.models.Cryptocurrency.destroy.mockRejectedValue(new Error("Dont found table"));
        let Cryptocurrency = new CrytocurrencyService(db);
        return await Cryptocurrency.delete(idCriptocurrency).catch(e =>
            expect(e).toEqual(new Error("Dont found table")),
        );
    });

    test('have Called update in update', () => {
        let idCriptocurrency = 1;
        db.sequelize.models.Cryptocurrency.update = jest.fn().mockName('destroy').mockReturnValueOnce(Promise.resolve());
        let Cryptocurrency = new CrytocurrencyService(db);
        Cryptocurrency.update(idCriptocurrency);
        expect(db.sequelize.models.Cryptocurrency.update).toHaveBeenCalled();
    });


    test('should trow error in update', async () => {
        let idCriptocurrency = 10;
        db.sequelize.models.Cryptocurrency.update.mockRejectedValue(new Error("Dont found table"));
        let Cryptocurrency = new CrytocurrencyService(db);
        return await Cryptocurrency.update(idCriptocurrency).catch(e =>
            expect(e).toEqual(new Error("Dont found table")),
        );
    });

    test('should fetch cryptocurrencies getTop', () => {
        this.data = [
            this.data
        ];
        db.sequelize.models.Cryptocurrency.findAll.mockResolvedValue(this.data);
        let Cryptocurrency = new CrytocurrencyService(db, this.userDataMock);
        return Cryptocurrency.getTop().then(data => expect(data).toEqual(this.data));
    });

    test('should trow error in getTop', async () => {
        db.sequelize.models.Cryptocurrency.findAll.mockRejectedValue(new Error("Dont found table"));
        let Cryptocurrency = new CrytocurrencyService(db, this.userDataMock);
        return await Cryptocurrency.getTop(3).catch(e =>
            expect(e).toEqual(new Error("Dont found table")),
        );
    });
});
