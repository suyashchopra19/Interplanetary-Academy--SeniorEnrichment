"use strict";

const db = require("../db");
const Student = require("./student");
const Campus = require("./Campus");

//associations
Student.belongsTo(Campus);
Campus.hasMany(Student);

module.exports = {
  db,
  Student,
  Campus
};
