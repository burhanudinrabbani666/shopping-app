"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TABLE "products"
       ALTER COLUMN "id"
       SET DEFAULT gen_random_uuid();`,
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `ALTER TABLE "products"
       ALTER COLUMN "id"
       DROP DEFAULT;`,
    );
  },
};
