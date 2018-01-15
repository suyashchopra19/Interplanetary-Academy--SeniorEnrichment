const Sequelize = require("sequelize");
var db = require("../db");

module.exports = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: true,
    validate: {
      len: {
        args: [1, 64],
        msg: "Please provide field within 50 to 200 characters."
      }
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      "https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png",
    notEmpty: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    notEmpty: true,
    validate: {
      len: {
        args: [1, 256],
        msg: "Please provide field within 50 to 200 characters."
      }
    }
  }
});

