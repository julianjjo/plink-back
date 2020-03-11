import db from '../../models/index';
import UserService from '../../services/userService';

jest.mock('../../models/index');

describe("User Service", function() {

    beforeEach(() => {
        this.data = {
            name:"Julian",
            lastname: "Mican",
            username: "jmican",
            password: "prueba",
            preferred_currency: "cop"
        };
    });

    test('should fetch users', () => {
        this.data = [
            this.data
        ];
        db.sequelize.models.User.findAll.mockResolvedValue(this.data);
        let User = new UserService(db);
        return User.getAll().then(data => expect(data).toEqual(this.data));
    });

    test('should trow error in getAll', async () => {
        db.sequelize.models.User.findAll.mockRejectedValue(new Error("Dont Find Table Error"));
        let User = new UserService(db);
        return await User.getAll().catch(e =>
            expect(e).toEqual(new Error("Dont Find Table Error")),
        );
    });

    test('have Called create in set', () => {
        this.data.cryptocurrencies = [
            {
                price: 7832,
                name: "Bitcoin",
                source: "testing"
            },
            {
                price: 191,
                name: "Ethereum",
                source: "testing"
            }
        ];
        db.sequelize.models.User.create = jest.fn().mockName('create');
        let User = new UserService(db);
        User.set(this.data);
        expect(db.sequelize.models.User.create).toHaveBeenCalled();
    });

    test('should trow error in set', async () => {
        db.sequelize.models.User.create.mockRejectedValue(new Error("Duplicate entry '' for key 'users.username'"));
        let User = new UserService(db);
        return await User.set().catch(e =>
            expect(e).toEqual(new Error("Duplicate entry '' for key 'users.username'")),
        );
    });


    test('should fetch cryptocurrency', () => {
        db.sequelize.models.User.findOne.mockResolvedValue(this.data);
        let User = new UserService(db);
        return User.get().then(data => expect(data).toEqual(this.data));
    });

    test('should fetch User not found in get', () => {
        this.data = undefined;
        db.sequelize.models.User.findOne.mockResolvedValue(this.data);
        let User = new UserService(db);
        return User.get().then(data => expect(data).toEqual("User not found"));
    });

    test('should trow error in get', async () => {
        db.sequelize.models.User.findOne.mockRejectedValue(new Error("Duplicate entry '' for key 'users.username'"));
        let User = new UserService(db);
        return await User.get().catch(e =>
            expect(e).toEqual(new Error("Duplicate entry '' for key 'users.username'")),
        );
    });

    test('have Called destroy in delete', () => {
        let idCriptocurrency = 1;
        db.sequelize.models.User.destroy = jest.fn().mockName('destroy').mockReturnValueOnce(Promise.resolve());
        let User = new UserService(db);
        User.delete(idCriptocurrency);
        expect(db.sequelize.models.User.destroy).toHaveBeenCalled();
    });

    test('should trow error in delete', async () => {
        let idCriptocurrency = 10;
        db.sequelize.models.User.destroy.mockRejectedValue(new Error("Dont found table"));
        let User = new UserService(db);
        return await User.delete(idCriptocurrency).catch(e =>
            expect(e).toEqual(new Error("Dont found table")),
        );
    });

    test('have Called update in update', () => {
        let idCriptocurrency = 1;
        db.sequelize.models.User.update = jest.fn().mockName('destroy').mockReturnValueOnce(Promise.resolve());
        let User = new UserService(db);
        User.update(idCriptocurrency);
        expect(db.sequelize.models.User.update).toHaveBeenCalled();
    });


    test('should trow error in update', async () => {
        let idCriptocurrency = 10;
        db.sequelize.models.User.update.mockRejectedValue(new Error("Dont found table"));
        let User = new UserService(db);
        return await User.update(idCriptocurrency).catch(e =>
            expect(e).toEqual(new Error("Dont found table")),
        );
    });
});