import React, { PropTypes } from 'react';
import Todo from './Todo';
import CreateTodo from './CreateTodo';

const Todos = ({ todos, onAddTodo, onRemoveTodo, toggleStatus }) =>
    <div className="todos">
        <CreateTodo onCreate={onAddTodo} />
        {
            todos.map(t =>
                <Todo
                    key={t.updatedAt}
                    onRemove={onRemoveTodo}
                    toggleStatus={toggleStatus}
                    {...t}/>
            )
        }
    </div>;

Todos.propTypes = {
    todos: PropTypes.array,
    onAddTodo: PropTypes.func,
    onRemoveTodo: PropTypes.func,
    toggleStatus: PropTypes.func
};

export default Todos;
