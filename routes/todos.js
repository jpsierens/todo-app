const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo.js');

/* GET /todos listing. */
router.get('/', function(req, res, next) {
  Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', function(req, res, next) {
  Todo.create(req.body, function (err, todo) {
    if (err) return next(err);
    console.log('New Todo created:');
    console.log(todo);
    res.json(todo);
  });
});

/* GET /todos/id */
router.get('/:id', function(req, res, next) {
  Todo.findById(req.params.id, function (err, todo) {
    if (err) return next(err);
    res.json(todo);
  });
});

/* PUT /todos/:id */
router.put('/:id', function(req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, req.body, function (err, todo) {
    if (err) return next(err);
    res.json(todo);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', function(req, res, next) {
  Todo.findByIdAndRemove(req.params.id, req.body, function (err, todo) {
    if (err) return next(err);
    console.log('Todo deleted:');
    console.log(todo);
    res.json(todo);
  });
});

module.exports = router;