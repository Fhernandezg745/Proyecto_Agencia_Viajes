'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('products', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            tittle: {
                type: Sequelize.STRING
            },
            shortDescription: {
                type: Sequelize.STRING
            },
            longDescription: {
                type: Sequelize.TEXT
            },
            days: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 7,
            },
            nights: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 7,
            },
            stars: {
                type: Sequelize.INTEGER,
                allowNull: true,
                defaultValue: 3,
            },
            base: {
                type: Sequelize.STRING
            },
            excursion: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            transfer: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            category: {
                type: Sequelize.STRING
            },
            flights: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            regionId: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            status: {
                type: Sequelize.STRING
            },
            salesPrice: {
                type: Sequelize.FLOAT,
                allowNull: true,
                defaultValue: 0,
            },
            creatorId: {
                type: Sequelize.INTEGER,
                allowNull: true
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('products');
    }
};