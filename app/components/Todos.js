import React, { PropTypes } from 'react';
import Todo from './Todo';
import CreateTodo from './CreateTodo';

const Todos = ({ todos, onAddTodo }) =>
    <div className="todos">
        <CreateTodo onCreate={onAddTodo} />
        { todos.map(t => <Todo key={t.updated_at} {...t} />) }
    </div>;

Todos.propTypes = {
    todos: PropTypes.array,
    onAddTodo: PropTypes.func
};

export default Todos;
