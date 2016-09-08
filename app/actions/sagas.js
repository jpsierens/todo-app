import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { postTodo, deleteTodo, updateTodo } from '../api';
import * as types from './types';

function* handleServerResponse(todo, success, failed, errorMsg) {
    if (todo.name) {
        yield put({
            type: success,
            todo
        });
    } else {
        yield put({
            type: failed,
            error: errorMsg
        });
    }
}

function* addTodo(action) {
    try {
        const todo = yield call(postTodo, action.data);
        yield* handleServerResponse(
            todo,
            types.ADD_TODO_SUCCESS,
            types.ADD_TODO_FAILED,
            'NETWORK ERROR: Todo wasn\'t created'
        );
    } catch(e) {
        yield put({
            type: types.ADD_TODO_FAILED,
            error: e
        });
    }
}

function* watchAddTodo() {
    yield* takeEvery(types.ADD_TODO_CLICK, addTodo);
}

function* removeTodo(action) {
    try {
        const todo = yield call(deleteTodo, action.id);
        yield* handleServerResponse(
            todo,
            types.REMOVE_TODO_SUCCESS,
            types.REMOVE_TODO_FAILED,
            'NETWORK ERROR: Todo wasn\'t deleted'
        );
    } catch(e) {
        yield put({
            type: types.REMOVE_TODO_FAILED,
            error: e
        });
    }
}

function* watchRemoveTodo() {
    yield* takeEvery(types.REMOVE_TODO_CLICK, removeTodo);
}

function* toggleStatus(action) {
    try {
        const todo = yield call(updateTodo, action.id, {
            completed: !action.status
        });
        yield* handleServerResponse(
            todo,
            types.TOGGLE_TODO_STATUS_SUCCESS,
            types.TOGGLE_TODO_STATUS_FAILED,
            'NETWORK ERROR: Todo status wasn\'t updated'
        );
    } catch(e) {
        yield put({
            type: types.TOGGLE_TODO_STATUS_FAILED,
            error: e
        });
    }
}

function* watchToggleStatus() {
    yield* takeEvery(types.TOGGLE_TODO_STATUS, toggleStatus);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        watchAddTodo(),
        watchRemoveTodo(),
        watchToggleStatus()
    ];
}
