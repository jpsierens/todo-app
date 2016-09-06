import * as types from './types';

export function addTodo(todo) {
    return {
        type: types.ADD_TODO_CLICK,
        data: todo
    };
}
