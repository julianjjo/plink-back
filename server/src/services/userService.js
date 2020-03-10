import db from '../models/index';
import "core-js/stable";
import "regenerator-runtime/runtime";

class userService{

    constructor(){
        this.user = db.sequelize.models.User;
    }

    getAllUsers() {
        let users;
        users = this.user.findAll()
            .then(function (users) {
                return JSON.parse(JSON.stringify(users));
            }).catch(function(err) {
                throw err;
            });
        return users;
    }
    async setUser(data) {
        try {
            await this.user.create(data);
        } catch (error) {
            console.log("");
            throw error;
        }
    }

    getUser(userId) {
        let user;
        user = this.user.findOne({
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

    deleteUser(userId){
        this.user.destroy({
            where: {
                id: userId
            }
        }).then().catch(function(err) {
                throw err;
        });
    }

    updateUser(userId, data) {
        this.user.update(data,
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