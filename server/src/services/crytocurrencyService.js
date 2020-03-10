import db from '../models/index';
import "core-js/stable";
import "regenerator-runtime/runtime";

class cryptocurrencyService{

    constructor(){
        this.crytocurrency = db.sequelize.models.Crytocurrency;
    }

    getAllCryptocurrencies() {
        let crytocurrencies;
        crytocurrencies = this.crytocurrency.findAll()
            .then(function (crytocurrencies) {
                return JSON.parse(JSON.stringify(crytocurrencies));
            }).catch(function(err) {
                throw err;
            });
        return crytocurrencies;
    }
    async setCrytocurrency(data) {
        try {
            await this.crytocurrency.create(data);
        } catch (error) {
            console.log("");
            throw error;
        }
    }

    getCrytocurrency(crytocurrencyId) {
        let crytocurrency;
        crytocurrency = this.crytocurrency.findOne({
            where: {
                id: crytocurrencyId
            }
        }).then(function(crytocurrency) {
            if (!crytocurrency) {
                return 'User not found';
            }
            return JSON.parse(JSON.stringify(crytocurrency));
        }).catch(function(err) {
            throw err;
        });
        return crytocurrency;
    }

    deleteCrytocurrency(crytocurrencyId){
        this.crytocurrency.destroy({
            where: {
                id: crytocurrencyId
            }
        }).then().catch(function(err) {
            throw err;
        });
    }

    updateCrytocurrency(crytocurrencyId, data) {
        this.crytocurrency.update(data,
            {
                where: {
                    id: crytocurrencyId
                }
            }
        ).then().catch(function(err) {
            throw err;
        });
    }
}

export default cryptocurrencyService;