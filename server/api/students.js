'use strict';
const app = require('express').Router();
const { Campus, Student } = require('../db/models');
module.exports = app;

//get all students
app.get('/', (req, res, next) => {
  Student.findAll({include:[{
    model: Campus
  }]})
    .then(students => res.send(students))
    .catch(next);
});

//get a single student
app.get('/:id', (req, res, next) => {
  Student.findById(req.params.id, { include: [{ model: Campus }] })
    .then(students => res.send(students))
    .catch(next);
});

//crate a new student
app.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.status(201).send(student))
    .catch(next);
});

//update a student
app.put('/:id', (req, res, next) => {
  Student.findById(req.params.id)
    .then(student => {
      (student.firstName = req.body.firstName || student.firstName),
        (student.lastName = req.body.lastName || student.lastName),
        (student.email = req.body.email || student.email),
        (student.gpa = req.body.gpa || student.gpa);
      student.campusId = req.body.campusId || student.campusId;
      return student.save();
    })
    .then(student => res.send(student))
    .catch(next);
});

// delete a student
app.delete('/:id', (req, res, next) => {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});
