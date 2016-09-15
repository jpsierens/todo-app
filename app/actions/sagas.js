import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { postTodo, deleteTodo, putTodo } from '../api';
import * as types from './types';

function* handleServerResponse(todo, success, failed, errorMsg, additional = {}) {
    if (todo && todo.name) {
        yield put(Object.assign({}, { type: success, todo }, additional));
    } else {
        yield put({ type: failed, error: errorMsg });
    }
}

export function* addTodo(action) {
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

export function* removeTodo(action) {
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

export function* updateTodo(action) {
    try {
        const { id, updates } = action;
        const todo = yield call(putTodo, id, updates);

        yield* handleServerResponse(
            todo,
            types.UPDATE_TODO_SUCCESS,
            types.UPDATE_TODO_FAILED,
            'NETWORK ERROR: Todo status wasn\'t updated',
            { updates }
        );
    } catch(e) {
        yield put({
            type: types.UPDATE_TODO_FAILED,
            error: e
        });
    }
}

function* watchUpdateTodo() {
    yield* takeEvery(types.UPDATE_TODO_CLICK, updateTodo);
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        watchAddTodo(),
        watchRemoveTodo(),
        watchUpdateTodo()
    ];
}
