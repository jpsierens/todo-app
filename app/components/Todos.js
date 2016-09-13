import React, { PropTypes } from 'react';
import Todo from './Todo';
import CreateTodo from './CreateTodo';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

const handleMoveTodo = (todos, moveTodo, indexes) => {
    const { dragIndex, hoverIndex } = indexes;

    return moveTodo(dragIndex, hoverIndex, todos[dragIndex]);
};

class Todos extends React.Component {
    render() {
        const { todos, onAddTodo, onRemoveTodo, updateTodo, moveTodo } = this.props;

        return (
            <div className="todos">
                <CreateTodo onCreate={onAddTodo} />
                {
                    todos.map((t, i) =>
                        <Todo
                            key={t.updatedAt}
                            index={i}
                            onRemove={onRemoveTodo}
                            updateTodo={updateTodo}
                            onMoveTodo={(indexes) => {
                                handleMoveTodo(todos, moveTodo, indexes);
                            }}
                            {...t}/>
                    )
                }
            </div>
        );
    }
}

Todos.propTypes = {
    todos: PropTypes.array,
    onAddTodo: PropTypes.func,
    onRemoveTodo: PropTypes.func,
    updateTodo: PropTypes.func,
    moveTodo: PropTypes.func
};

export default DragDropContext(HTML5Backend)(Todos);
