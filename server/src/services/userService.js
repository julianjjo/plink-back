import "core-js/stable";
import "regenerator-runtime/runtime";

class userService{

    constructor(db){
        this.user = db.sequelize.models.User;
    }

    async getAll() {
        let users;
        users = await this.user.findAll()
            .then(function (users) {
                return JSON.parse(JSON.stringify(users));
            }).catch(function(err) {
                throw err;
            });
        return users;
    }

    async set(data) {
        await this.user.create(data,
            {
                include: [ 'Cryptocurrencies' ]
            })
            .then().catch(function(err) {
                throw err;
            });
    }

    async get(userId) {
        let user;
        user = await this.user.findOne({
            where: {
                id: userId
            }
        }).then(function(user) {
            if (!user) {
                return 'User not found';
            }
            return JSON.parse(JSON.stringify(user));
        }).catch(function(err) {
            throw err;
        });
        return user;
    }

    async delete(userId){
        await this.user.destroy({
            where: {
                id: userId
            }
        }).then().catch(function(err) {
                throw err;
        });
    }

    async update(userId, data) {
        await this.user.update(data,
            {
                where: {
                    id: userId
                }
            }
        ).then().catch(function(err) {
            throw err;
        });
    }
}

export default userService;