const Sequelize = require("sequelize");
const db = require("../db");

module.exports = db.define(
  "student",
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    gpa: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0.0,
        max: 4.0
      }
    },
    fullName: {
      type: Sequelize.VIRTUAL,
      get: function() {
        return (
          this.getDataValue("firstName") + " " + this.getDataValue("lastName")
        );
      }
    }
  },
  {}
);