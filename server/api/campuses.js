'use strict';
const app = require('express').Router();
const { Campus, Student } = require('../db/models');
module.exports = app;

//get all Campuss
app.get('/', (req, res, next) => {
  Campus.findAll({include: [{
    model: Student
  }]})
    .then(campuses => res.send(campuses))
    .catch(next);
});

//get a single school
app.get('/:id', (req, res, next) => {
  Campus.findById(req.params.id, { include: [{ model: Student }] })
    .then(campuses => res.send(campuses))
    .catch(next);
});

//crate a new Campus
app.post('/', (req, res, next) => {
  console.log(req.body.name);
  Campus.create(req.body)
    .then(campus => res.status(201).send(campus))
    .catch(next);
});

//update a campus
app.put('/:id', (req, res, next) => {
  Campus.findById(req.params.id)
    .then(campus => {
        campus.name = req.body.name,
        campus.imageUrl = req.body.imageUr,
        campus.description = req.body.description;
      return campus.save();
    })
    .then(campus => res.send(campus))
    .catch(next);
});

// delete a campus
app.delete('/:id', (req, res, next) => {
  Campus.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});
