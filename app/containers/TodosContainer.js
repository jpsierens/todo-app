import { connect } from 'react-redux';
import { addTodo, removeTodo, updateTodo, moveTodo } from '../actions';
import Todos from '../components/Todos';

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (todo) => dispatch(addTodo(todo)),
        onRemoveTodo: (id) => dispatch(removeTodo(id)),
        updateTodo: (id, updates) =>
            dispatch(updateTodo(id, updates)),
        moveTodo: (dragIndex, hoverIndex, todo) =>
            dispatch(moveTodo(dragIndex, hoverIndex, todo))
    };
};

const TodosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todos);

export default TodosContainer;
