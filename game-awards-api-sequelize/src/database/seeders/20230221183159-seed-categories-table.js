"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Game Of The Year",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Best Music Direction",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Best Art Design",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
