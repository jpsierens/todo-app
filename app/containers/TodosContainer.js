import { connect } from 'react-redux';
import { addTodo } from '../actions';
import Todos from '../components/Todos';

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTodo: (todo) => dispatch(addTodo(todo))
    };
};

const TodosContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Todos);

export default TodosContainer;
