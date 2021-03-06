import "core-js/stable";
import "regenerator-runtime/runtime";

class cryptocurrencyService{

    constructor(db, userData) {
        this.userData = userData;
        this.db = db;
        this.cryptocurrency = db.sequelize.models.Cryptocurrency;
    }

    async getAll() {
        let cryptocurrencies;
        cryptocurrencies = await this.cryptocurrency.findAll({
            include: {
                model: this.db.sequelize.models.User,
                as: 'User',
                where: {id: this.userData.id}
            }
        })
            .then(function (crytocurrencies) {
                return JSON.parse(JSON.stringify(crytocurrencies));
            }).catch(function (err) {
                throw err;
            });
        return cryptocurrencies;
    }

    async set(data) {
        await this.cryptocurrency.create(data)
            .then().catch(function(err) {
                throw err;
            });
    }

    async get(crytocurrencyId) {
        let cryptocurrencyResult;
        cryptocurrencyResult = await this.cryptocurrency.findOne({
            where: {
                id: crytocurrencyId
            }
        }).then(function (crytocurrency) {
            if (!crytocurrency) {
                return 'CryptoCurrency not found';
            }
            return JSON.parse(JSON.stringify(crytocurrency));
        }).catch(function (err) {
            throw err;
        });
        return cryptocurrencyResult;
    }

    async delete(cryptocurrencyId){
        await this.cryptocurrency.destroy({
            where: {
                id: cryptocurrencyId
            }
        }).then().catch(function(err) {
            throw err;
        });
    }

    async update(crytocurrencyId, data) {
        await this.cryptocurrency.update(data,
            {
                where: {
                    id: crytocurrencyId
                }
            }
        ).then().catch(function(err) {
            throw err;
        });
    }

    async getTop(limit) {
        let cryptocurrencies;
        cryptocurrencies = await this.cryptocurrency.findAll({
            order: [
                ['price', 'DESC']
            ],
            limit: limit,
            include: {
                model: this.db.sequelize.models.User,
                as: 'User',
                where: {id: this.userData.id}
            }
        })  .then(function (crytocurrencies) {
                return JSON.parse(JSON.stringify(crytocurrencies));
            }).catch(function (err) {
                throw err;
            });
        return cryptocurrencies;
    }
}

export default cryptocurrencyService;