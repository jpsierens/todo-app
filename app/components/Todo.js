import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import handleUpdateTodo from '../helpers/handleUpdateTodo';

const todoSource = {
    beginDrag(props) {
        return { props };
    }
};

const todoTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        if (dragIndex !== undefined && hoverIndex !== undefined) {
            props.onMoveTodo({ dragIndex, hoverIndex });
        }

        monitor.getItem().index = hoverIndex;
    }
};

const connectDrag = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    };
};

const connectDrop = (connect) => {
    return { connectDropTarget: connect.dropTarget() };
};

const Todo = (props) => {
    const {
        _id,
        index,
        name,
        note,
        completed,
        updatedAt,
        onRemove,
        updateTodo,
        connectDragSource,
        isDragging,
        connectDropTarget
    } = props;

    const time = new Date(updatedAt);

    return connectDragSource(connectDropTarget(
        <div className={`todo ${ completed ? 'done' : ''} ${isDragging ? 'dragging' : ''}`}>
            <Link to={`/${index}`}>
                <h2> { name } </h2>
                <p> { note} </p>
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
                <span
                    className="close-todo"
                    onClick={(e) => {
                        e.preventDefault();
                        onRemove(_id);
                    }}>

                    X
                </span>
            </Link>
        </div>
    ));
};

Todo.propTypes = {
    _id: PropTypes.string,
    index: PropTypes.number,
    name: PropTypes.string,
    note: PropTypes.string,
    completed: PropTypes.bool,
    updatedAt: PropTypes.string,
    onRemove: PropTypes.func,
    updateTodo: PropTypes.func,
    connectDragSource: PropTypes.func,
    isDragging: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    onMoveTodo: PropTypes.func
};

const decorateWithDrag = (component) => {
    return DragSource('Todo', todoSource, connectDrag)(component);
};
const decorateWithDrop = (component) => {
    return DropTarget('Todo', todoTarget, connectDrop)(component);
};

export default decorateWithDrop(decorateWithDrag(Todo));
