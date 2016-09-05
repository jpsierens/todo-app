import React, { PropTypes } from 'react';

const handleSubmit = (name, note, onCreate) => {
    if (!name || !note) return;

    onCreate({ name, note });
};

const CreateTodo = ({ onCreate }) => {
    let name;
    let note;

    return (
        <form className="create-todo">
            <input
                type="text"
                maxLength="20"
                placeholder="Title"
                required
                ref={r => {
                    name = r;
                }} />

            <textarea
                maxLength="200"
                placeholder="Note"
                required
                ref={r => {
                    note = r;
                }}>
            </textarea>

            <button
                type="submit"
                onClick={() =>
                    handleSubmit(name, note, onCreate)}>
                
                SUBMIT
            </button>
        </form>
    );
};

CreateTodo.propTypes = {
    onCreate: PropTypes.func
};

export default CreateTodo;
