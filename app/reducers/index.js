import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';


const todos = (state = [], action) => {
    switch (action.type) {
        case types.ADD_TODO_SUCCESS:
            return [action.data, ...state];
        case types.REMOVE_TODO_SUCCESS:
            return state.filter((t) => t._id !== action.data._id );
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    todos,
    routing
});

export default rootReducer;
