import React, { PropTypes } from 'react';

const Todo = ({ name, note, completed }) =>
    <div className="todo">
        <h2> { name } </h2>
        <p> { note} </p>
        <div className="status">
            Status: { completed ? 'Done' : 'Not Done'}
        </div>
    </div>;

Todo.propTypes = {
    name: PropTypes.string,
    note: PropTypes.string,
    completed: PropTypes.bool
};

export default Todo;
