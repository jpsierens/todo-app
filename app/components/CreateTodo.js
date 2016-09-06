import React, { PropTypes } from 'react';

const handleSubmit = (nameInput, noteInput, onCreate) => {
    const name = nameInput.value;
    const note = noteInput.value;

    if (!name || !note) return;

    onCreate({ name, note });
};

const CreateTodo = ({ onCreate }) => {
    let nameInput;
    let noteInput;

    return (
        <form className="create-todo">
            <input
                type="text"
                maxLength="20"
                placeholder="Title"
                required
                ref={r => {
                    nameInput = r;
                }} />

            <textarea
                maxLength="200"
                placeholder="Note"
                required
                ref={r => {
                    noteInput = r;
                }}>
            </textarea>

            <button
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(nameInput, noteInput, onCreate);
                }}>

                SUBMIT
            </button>
        </form>
    );
};

CreateTodo.propTypes = {
    onCreate: PropTypes.func
};

export default CreateTodo;
