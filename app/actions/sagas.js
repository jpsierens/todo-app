import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';
import { postTodo } from '../api';
import * as types from './types';

function* addTodo(action) {
    try {
        const todo = yield call(postTodo, action.data);

        if (todo.name) {
            yield put({
                type: types.ADD_TODO_SUCCESS,
                data: todo
            });
        } else {
            yield put({
                type: types.ADD_TODO_FAILED,
                error: 'NETWORK ERROR: Todo wasn\'t created'
            });
        }
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

function* helloSaga() {
    console.log('Hello Sagas!');
}

// single entry point to start all Sagas at once
export default function* rootSaga() {
    yield [
        helloSaga(),
        watchAddTodo()
    ];
}
