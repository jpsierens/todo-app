import * as types from './types';

export function addTodo(todo) {
    return {
        type: types.ADD_TODO_CLICK,
        data: todo
    };
}

export function removeTodo(id) {
    return {
        type: types.REMOVE_TODO_CLICK,
        id
    };
}

export function updateTodo(id, updates) {
    return {
        type: types.UPDATE_TODO_CLICK,
        updates,
        id
    };
}

export function moveTodo(dragIndex, hoverIndex, todo) {
    return {
        type: types.MOVE_TODO,
        dragIndex,
        hoverIndex,
        todo
    };
}
