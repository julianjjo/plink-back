import db from '../models/index';

class userService{
    getAllUsers() {
        db.sequelize.models.User.findAll().then(function (users) {
            return users;
        }).catch(function(err) {
            return err;
        });
    }
}