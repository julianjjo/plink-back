import db from '../models/index';
import "core-js/stable";
import "regenerator-runtime/runtime";

class userService{

    constructor(){
        this.user = db.sequelize.models.User;
    }

    getAllUsers() {
        this.user.findAll().then(function (users) {
            return users;
        }).catch(function(err) {
            throw err;
        });
    }
    async setUser(data) {
        try {
            await this.user.create(data);
        } catch (error) {
            console.log("");
            throw error;
        }
    }
}

export default userService;