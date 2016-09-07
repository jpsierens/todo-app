import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { postTodo, deleteTodo } from '../api';
import * as types from './types';

function* handleServerResponse(todo, success, failed, errorMsg) {
    if (todo.name) {
        yield put({
            type: success,
            data: todo
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

function* helloSaga() {
    console.log('Hello Sagas!');
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        helloSaga(),
        watchAddTodo(),
        watchRemoveTodo()
    ];
}
