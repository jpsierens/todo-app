import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import handleUpdateStatus from '../helpers/handleUpdateStatus';

const TodoDetail = ({ todo, updateTodo, onRemove, router }) => {
    const { name, note, _id, completed, updatedAt } = todo;
    const time = new Date(updatedAt);

    return (
        <div className={`todo ${ completed ? 'done' : ''}`}>
            <h2> { name } </h2>
            <p> { note} </p>
            <div>
                <button
                    className="btn-status"
                    onClick={(e) => handleUpdateStatus(e, updateTodo, completed, _id)}>

                    Status: { completed ? 'Done' : 'Not Done'}
                </button>
                <span className="datetime">
                    Last Updated: { time.toLocaleString() }
                </span>
            </div>
            <span
                className="close-todo"
                onClick={(e) => {
                    e.preventDefault();
                    onRemove(_id);
                    router.push('/');
                }}>

                X
            </span>
        </div>
    );
};

TodoDetail.propTypes = {
    todo: PropTypes.object,
    onRemove: PropTypes.func,
    updateTodo: PropTypes.func,
    router: PropTypes.object
};


export default withRouter(TodoDetail);
