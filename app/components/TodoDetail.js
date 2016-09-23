import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import handleUpdateTodo from '../helpers/handleUpdateTodo';
import withExit from '../helpers/withExit';
import * as rules from '../rules';

const handleSave = (router, nameInput, noteInput, params) => {
    const newName = nameInput.value;
    const newNote = noteInput.value;

    if (!newName || !newNote) return;

    params.push({
        name: newName,
        note: newNote
    });

    withExit(handleUpdateTodo)(router, '/', params);
};

const TodoDetail = ({ todo, updateTodo, onRemove, router }) => {
    const { name, note, _id, completed, updatedAt } = todo;
    const time = new Date(updatedAt);

    let nameInput;
    let noteInput;

    return (
        <div className={`todo todo-detail ${ completed ? 'done' : ''}`}>
            <form>
                <input
                    type="text"
                    defaultValue={name}
                    maxLength={`${rules.NAME_LENGTH}`}
                    ref={(ref) => { nameInput = ref; }}/>

                <textarea
                    rows="10"
                    cols="50"
                    defaultValue={note}
                    maxLength={`${rules.NOTE_LENGTH}`}
                    ref={(ref) => { noteInput = ref; }}/>
            </form>

            <div>
                <button
                    className="btn-status"
                    onClick={(e) => handleUpdateTodo(e, updateTodo, _id, {
                        completed: !completed
                    })}>

                    Status: { completed ? 'Done' : 'Not Done'}
                </button>
                <span className="datetime">
                    Last Updated: { time.toLocaleString() }
                </span>
            </div>
            <button
                className="btn-save"
                onClick={(e) => handleSave(router, nameInput, noteInput, [e, updateTodo, _id])}>

                SAVE
            </button>
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
