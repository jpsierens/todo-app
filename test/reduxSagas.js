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
        let returnedTodoId;

        it('should execute the call method and return the effect', () => {
            expect(generator.next().value).toEqual(call(postTodo, todo));
        });

        it('should dispatch an ADD_TODO_SUCCESS action', (done) => {
            postTodo(todo).then(todo => {
                returnedTodoId = todo._id;
                expect(generator.next(todo).value.PUT.action)
                    .toEqual({
                        type: types.ADD_TODO_SUCCESS,
                        todo    
                    });
                done();
            });
        });

        it('should be done', () => {
            // console.log(generator.next().value.PUT.action)
            expect(generator.next().done).toEqual(true);
        });

        deleteTodo(returnedTodoId)
            .catch(e => 'Could not Delete Test todo: '+e);
    });

});
