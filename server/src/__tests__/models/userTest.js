const UserModel = require('../../models/user')
const {
    sequelize,
    dataTypes,
    checkModelName
} = require('sequelize-test-helpers');

describe("User Model", function() {

    describe("Creation", function() {
        const User = UserModel(sequelize, dataTypes);
        checkModelName(User)('User');
    });
})