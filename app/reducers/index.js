import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';


const todos = (state = [], action) => {
    switch (action.type) {
        case types.ADD_TODO_SUCCESS:
            return [action.todo, ...state];

        case types.REMOVE_TODO_SUCCESS:
            return state.filter((t) => t._id !== action.todo._id );

        case types.UPDATE_TODO_SUCCESS:
            const { updates, todo } = action;
            return state.map(t => {
                if (t._id === todo._id) {
                    return Object.assign({}, todo, updates);
                }
                return t;
            });

        case types.MOVE_TODO:
            const newState = [...state];
            newState.splice(action.dragIndex, 1);
            return [
                ...newState.slice(0, action.hoverIndex),
                action.todo,
                ...newState.slice(action.hoverIndex)
            ];

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    todos,
    routing
});

export default rootReducer;
