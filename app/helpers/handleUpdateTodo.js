const handleUpdateTodo = (e, updateTodo, _id, changes) => {
    e.preventDefault();
    const now = new Date();
    const updatedAt = now.toISOString();

    updateTodo(_id, {
        updatedAt,
        ...changes
    });

    return;
};

export default handleUpdateTodo;
