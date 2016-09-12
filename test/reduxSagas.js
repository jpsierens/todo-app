import "babel-polyfill";
import expect from "expect";
import { put, call } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as sagas from "../app/actions/sagas";
import * as types from "../app/actions/types";
import { postTodo, deleteTodo, updateTodo } from '../app/api';

describe('redux sagas', () => {

    describe('add todo', () => {
        const todo = {
            name: "test the todos",
            note: "Testing todos"
        };
        const action = {
            type: types.ADD_TODO_CLICK,
            data: todo
        };
        const generator = sagas.addTodo(action);

        it('should call the postTodo method', () => {
            expect(generator.next().value).toEqual(call(postTodo, todo));
        });

        it('should dispatch an ADD_TODO_SUCCESS action', () => {
            console.log(generator.next().value);
            expect(generator.next().value.action.type)
                .toEqual(types.ADD_TODO_SUCCESS);
        });
    });

});
