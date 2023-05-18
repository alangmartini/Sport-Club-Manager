'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      team_name: Sequelize.STRING,
    });
  },

  async down (queryInterface, Sequelize) {
    queryInterface.dropTable('teams');
  }
};
