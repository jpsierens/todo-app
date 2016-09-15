import expect from "expect";
import * as actions from "../app/actions/index";
import * as types from "../app/actions/types";

describe('sync actions', () => {
    const todo = {
        _id: "57d3ce8b66e5e92c16bc6528",
        name: "test the todos",
        updatedAt: "2016-09-11T09:21:57.834Z",
        note: "Testing todos",
        completed: false
    }

    describe('addTodo', () => {
        it('should create an action to add a todo', () => {
            const expectedAction = {
                type: types.ADD_TODO_CLICK,
                data: todo
            };
            expect(actions.addTodo(todo)).toEqual(expectedAction);
        })
    });

    describe('removeTodo', () => {
        it('should create an action to remove a todo', () => {
            const id = "someid123";
            const expectedAction = {
                type: types.REMOVE_TODO_CLICK,
                id
            };
            expect(actions.removeTodo(id)).toEqual(expectedAction);
        })
    });

    describe('moveTodo', () => {
        it('should create an action to move a todo', () => {
            const dragIndex = 1;
            const hoverIndex = 2;
            const expectedAction = {
                type: types.MOVE_TODO,
                dragIndex,
                hoverIndex,
                todo
            };
            expect(actions.moveTodo(dragIndex, hoverIndex, todo))
                .toEqual(expectedAction);
        })
    });

    describe('updateTodo', () => {
        it('should create an action to update a todo', () => {
            const id = "someid123";
            const updates = { completed: false };
            const expectedAction = {
                type: types.UPDATE_TODO_CLICK,
                updates,
                id
            };
            expect(actions.updateTodo(id, updates))
                .toEqual(expectedAction);
        })
    });

});
