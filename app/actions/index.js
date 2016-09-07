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
