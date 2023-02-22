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
        name: "Best Game Direction",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Best Narrative",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Best Art Direction",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Best Score and Music",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
