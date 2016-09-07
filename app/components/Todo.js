import React, { PropTypes } from 'react';

const Todo = ({ name, note, completed, updatedAt, onRemove, _id }) => {
    const time = new Date(updatedAt);

    return (
        <div className="todo">
            <h2> { name } </h2>
            <p> { note} </p>
            <div className="status">
                Status: { completed ? 'Done' : 'Not Done'}
                <span className="datetime">
                    Last Updated: { time.toLocaleString() }
                </span>
            </div>
            <span
                className="close-todo"
                onClick={() => onRemove(_id)}>
                X
            </span>
        </div>
    );
};

Todo.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    note: PropTypes.string,
    completed: PropTypes.bool,
    updatedAt: PropTypes.string,
    onRemove: PropTypes.func
};

export default Todo;
