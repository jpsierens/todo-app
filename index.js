// Load mongoose package
const mongoose = require('mongoose');

// Connect to MongoDB and create/use database called todoAppTest
mongoose.connect('mongodb://localhost/todoAppTest');

// Create a schema
const TodoSchema = new mongoose.Schema({
  name: String,
  completed: Boolean,
  note: String,
  updated_at: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Todo = mongoose.model('Todo', TodoSchema);

// Create a todo in memory
const todo = new Todo({
  name: 'Master NodeJS', 
  completed: false, 
  note: 'Getting there...'}
);

// Save it to database
todo.save((err) => {
  const oneYearAgo = new Date();
  oneYearAgo.setYear(oneYearAgo.getFullYear() - 1);

  if(err) {
    console.log(err);
  }

  // Find all data in the Todo collection
  // Todo.find(function (err, todos) {
  //   if (err) return console.error(err);
  //   console.log(todos)
  // });

  // Get all tasks staring with `Master`, not completed and created from year ago to now...
  Todo
    .find({name: /^Master/, completed: false })
    .where('updated_at')
    .gt(oneYearAgo)
    .exec((err, data) => console.log(data));
});
