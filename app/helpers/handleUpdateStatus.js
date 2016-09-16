const handleUpdateStatus = (e, updateTodo, completed, _id) => {
    e.preventDefault();
    const now = new Date();
    const updatedAt = now.toISOString();

    updateTodo(_id, {
        updatedAt,
        completed: !completed
    });
};

export default handleUpdateStatus;
