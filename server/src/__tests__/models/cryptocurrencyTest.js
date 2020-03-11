const Cryptocurrency = require('../../models/cryptocurrency');
const {
    sequelize,
    dataTypes,
    checkModelName
} = require('sequelize-test-helpers');

describe("Cryptocurrency Model", function() {

    describe("Creation", function() {
        const cryptocurrency = Cryptocurrency(sequelize, dataTypes);
        checkModelName(cryptocurrency)('Cryptocurrency');
    });
});