import React, { PropTypes } from 'react';

const Todo = ({ _id, name, note, completed, updatedAt, onRemove, toggleStatus }) => {
    const time = new Date(updatedAt);

    return (
        <div className={`todo ${ completed ? 'done' : ''}`}>
            <h2> { name } </h2>
            <p> { note} </p>
            <div>
                <button
                    className="btn-status"
                    onClick={() => toggleStatus(_id, completed)}>

                    Status: { completed ? 'Done' : 'Not Done'}
                </button>
                <span className="datetime">
                    Last Updated: { time.toLocaleString() }
                </span>
            </div>
            <span
                className="close-todo"
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove(_id);
                }}>

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
    onRemove: PropTypes.func,
    toggleStatus: PropTypes.func
};

export default Todo;
