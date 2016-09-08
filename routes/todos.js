const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Todo = require('../models/Todo.js');

/* GET /todos listing. */
router.get('/', (req, res, next) => {
  Todo.find().sort({ updatedAt: -1 }).exec((err, todos) => {
    if (err) return next(err);
    res.json(todos);
  });
});

/* POST /todos */
router.post('/', (req, res, next) => {
  Todo.create(req.body,  (err, todo) => {
    if (err) return next(err);
    console.log('New Todo created:');
    console.log(todo);
    res.json(todo);
  });
});

/* GET /todos/id */
router.get('/:id', (req, res, next) => {
  Todo.findById(req.params.id, (err, todo) => {
    if (err) return next(err);
    res.json(todo);
  });
});

/* PUT /todos/:id */
router.put('/:id', (req, res, next) => {
  Todo.findByIdAndUpdate(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    res.json(todo);
  });
});

/* DELETE /todos/:id */
router.delete('/:id', (req, res, next) => {
  Todo.findByIdAndRemove(req.params.id, req.body, (err, todo) => {
    if (err) return next(err);
    console.log('Todo deleted:');
    console.log(todo);
    res.json(todo);
  });
});

module.exports = router;