import "babel-polyfill";
import expect from "expect";
import { put, call } from 'redux-saga/effects'
import * as sagas from "../app/actions/sagas";
import * as types from "../app/actions/types";
import { postTodo, deleteTodo, putTodo } from '../app/api';

describe('redux sagas', () => {
    const todoModel = {
        name: "test the todos",
        note: "Testing todos"
    };

    describe('add todo', () => {
        const action = {
            type: types.ADD_TODO_CLICK,
            data: todoModel
        };
        const generator = sagas.addTodo(action);
        let returnedTodoId;

        it('should execute the call method and return the effect', () => {
            expect(generator.next().value).toEqual(call(postTodo, todoModel));
        });

        it('should dispatch an ADD_TODO_SUCCESS action once the todo has been added succesfully', (done) => {
            postTodo(todoModel).then(todo => {
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
            expect(generator.next().done).toEqual(true);
        });

        after('delete dummy todo', (done) => {
            // lets get rid of the test todo.
            deleteTodo(returnedTodoId)
                .then(() => done())
                .catch(e => {
                    console.log('ERROR removing todo: '+e);
                    done();
                });
        })
    });

    describe('remove todo', () => {
        let createdTodo, action, generator;

        before('create a dummy todo and start the generator', (done) => {
            // create a dummy todo
            postTodo(todoModel).then(t => {
                createdTodo = t;
                action = {
                    type: types.REMOVE_TODO_CLICK,
                    id: createdTodo._id
                };
                generator = sagas.removeTodo(action);
                done();
            })
        });

        it ('should execute the call method and return the effect', () => {
            expect(generator.next().value).toEqual(call(deleteTodo, createdTodo._id));
        });

        it('should dispatch a REMOVE_TODO_SUCCESS action once the todo has been deleted', (done) => {
            deleteTodo(createdTodo._id).then(todo => {
                expect(generator.next(todo).value.PUT.action)
                    .toEqual({
                        type: types.REMOVE_TODO_SUCCESS,
                        todo    
                    });
                done();
            });
        });

        it('should be done', () => {
            expect(generator.next().done).toEqual(true);
        });
    });

    describe('update todo', () => {
        let createdTodo, action, generator;

        before('create a dummy todo and start the generator', (done) => {
            // create a dummy todo
            postTodo(todoModel).then(t => {
                createdTodo = t;
                action = {
                    type: types.UPDATE_TODO_CLICK,
                    id: createdTodo._id,
                    updates: {
                        completed: true,
                        updatedAt: Date.now()
                    }
                };
                generator = sagas.updateTodo(action);
                done();
            })
        });

        it ('should execute the call method and return the effect', () => {
            expect(generator.next().value).toEqual(call(putTodo, createdTodo._id, action.updates));
        });

        it('should dispatch a UPDATE_TODO_SUCCESS action once the todo has been updated', (done) => {
            putTodo(createdTodo._id, action.updates).then(todo => {
                expect(generator.next(todo).value.PUT.action)
                    .toEqual({
                        type: types.UPDATE_TODO_SUCCESS,
                        todo,
                        updates: action.updates
                    });
                done();
            });
        });

        it('should be done', () => {
            expect(generator.next().done).toEqual(true);
        });

        after('delete dummy todo', (done) => {
            // lets get rid of the dummy todo.
            deleteTodo(createdTodo._id)
                .then(() => done())
                .catch(e => {
                    console.log('ERROR removing todo: '+e);
                    done();
                });
        })

    });

});
